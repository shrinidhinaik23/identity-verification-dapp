// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract IdentityVerification {
    address public admin;
    uint256 public requiredApprovals = 1;
    uint256 public identityCounter = 0;

    constructor() {
        admin = msg.sender;
    }

    enum Status {
        Pending,
        Verified,
        Rejected,
        Revoked
    }

    struct Identity {
        uint256 identityId;
        address userWallet;
        string name;
        string idNumber;
        string documentHash;
        string documentCID;
        Status status;
        bool exists;
        uint256 approvalCount;
    }

    struct VerificationHistory {
        address verifier;
        Status oldStatus;
        Status newStatus;
        uint256 timestamp;
        string remark;
    }

    struct RevocationInfo {
        bool revoked;
        address revokedBy;
        uint256 revokedAt;
        string reason;
    }

    mapping(address => Identity) public identities;
    mapping(uint256 => address) public identityIdToWallet;
    mapping(address => bool) public verifiers;
    mapping(address => VerificationHistory[]) public history;
    mapping(address => mapping(address => bool)) public hasApproved;
    mapping(address => mapping(address => bool)) public sharedAccess;
    mapping(address => RevocationInfo) public revocationDetails;

    address[] private verifierList;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier onlyVerifier() {
        require(msg.sender == admin || verifiers[msg.sender], "Only verifier");
        _;
    }

    modifier identityExists(address user) {
        require(identities[user].exists, "Identity not found");
        _;
    }

    modifier canView(address user) {
        require(
            msg.sender == user ||
            msg.sender == admin ||
            verifiers[msg.sender] ||
            sharedAccess[user][msg.sender],
            "Access denied"
        );
        _;
    }

    function transferAdmin(address newAdmin) public onlyAdmin {
        require(newAdmin != address(0), "Invalid address");
        admin = newAdmin;
    }

    function addVerifier(address verifier) public onlyAdmin {
        require(verifier != address(0), "Invalid address");
        require(!verifiers[verifier], "Already verifier");

        verifiers[verifier] = true;
        verifierList.push(verifier);
    }

    function removeVerifier(address verifier) public onlyAdmin {
        require(verifiers[verifier], "Not a verifier");

        verifiers[verifier] = false;

        for (uint256 i = 0; i < verifierList.length; i++) {
            if (verifierList[i] == verifier) {
                verifierList[i] = verifierList[verifierList.length - 1];
                verifierList.pop();
                break;
            }
        }
    }

    function setRequiredApprovals(uint256 _count) public onlyAdmin {
        require(_count > 0, "Must be greater than 0");
        requiredApprovals = _count;
    }

    function getVerifierCount() public view returns (uint256) {
        return verifierList.length;
    }

    function getVerifierByIndex(uint256 index) public view returns (address) {
        require(index < verifierList.length, "Invalid index");
        return verifierList[index];
    }

    function getAllVerifiers() public view returns (address[] memory) {
        return verifierList;
    }

    function addIdentity(
        string memory _name,
        string memory _idNumber,
        string memory _documentHash,
        string memory _documentCID
    ) public {
        if (!identities[msg.sender].exists) {
            identityCounter++;

            identities[msg.sender] = Identity({
                identityId: identityCounter,
                userWallet: msg.sender,
                name: _name,
                idNumber: _idNumber,
                documentHash: _documentHash,
                documentCID: _documentCID,
                status: Status.Pending,
                exists: true,
                approvalCount: 0
            });

            identityIdToWallet[identityCounter] = msg.sender;

            history[msg.sender].push(
                VerificationHistory({
                    verifier: msg.sender,
                    oldStatus: Status.Pending,
                    newStatus: Status.Pending,
                    timestamp: block.timestamp,
                    remark: "Identity created"
                })
            );
        } else {
            Identity storage i = identities[msg.sender];
            Status old = i.status;

            i.name = _name;
            i.idNumber = _idNumber;
            i.documentHash = _documentHash;
            i.documentCID = _documentCID;
            i.status = Status.Pending;
            i.approvalCount = 0;

            hasApproved[msg.sender][admin] = false;

            history[msg.sender].push(
                VerificationHistory({
                    verifier: msg.sender,
                    oldStatus: old,
                    newStatus: Status.Pending,
                    timestamp: block.timestamp,
                    remark: "Identity updated and resubmitted"
                })
            );
        }
    }

    function grantAccess(address viewer) public identityExists(msg.sender) {
        require(viewer != address(0), "Invalid address");
        sharedAccess[msg.sender][viewer] = true;
    }

    function revokeAccess(address viewer) public identityExists(msg.sender) {
        require(viewer != address(0), "Invalid address");
        sharedAccess[msg.sender][viewer] = false;
    }

    function hasViewAccess(address user, address viewer) public view returns (bool) {
        return (
            viewer == user ||
            viewer == admin ||
            verifiers[viewer] ||
            sharedAccess[user][viewer]
        );
    }

    function approveIdentity(address user, string memory remark)
    public
    onlyVerifier
    identityExists(user)
{
    require(user != msg.sender, "You cannot verify your own identity");
    require(identities[user].status == Status.Pending, "Identity not pending");
    require(!hasApproved[user][msg.sender], "Already approved by this verifier");
    

    Status old = identities[user].status;

    hasApproved[user][msg.sender] = true;
    identities[user].approvalCount += 1;

    if (identities[user].approvalCount >= requiredApprovals) {
        identities[user].status = Status.Verified;
    }

    history[user].push(
        VerificationHistory({
            verifier: msg.sender,
            oldStatus: old,
            newStatus: identities[user].status,
            timestamp: block.timestamp,
            remark: remark
        })
    );
}
    function rejectIdentity(address user, string memory remark)
        public
        onlyVerifier
        identityExists(user)
    {
        Status old = identities[user].status;

        identities[user].status = Status.Rejected;

        history[user].push(
            VerificationHistory({
                verifier: msg.sender,
                oldStatus: old,
                newStatus: Status.Rejected,
                timestamp: block.timestamp,
                remark: remark
            })
        );
    }

    function revokeIdentity(address user, string memory reason)
        public
        onlyVerifier
        identityExists(user)
    {
        Status old = identities[user].status;

        identities[user].status = Status.Revoked;

        revocationDetails[user] = RevocationInfo({
            revoked: true,
            revokedBy: msg.sender,
            revokedAt: block.timestamp,
            reason: reason
        });

        history[user].push(
            VerificationHistory({
                verifier: msg.sender,
                oldStatus: old,
                newStatus: Status.Revoked,
                timestamp: block.timestamp,
                remark: reason
            })
        );
    }

    function getMyIdentity()
        public
        view
        identityExists(msg.sender)
        returns (
            uint256 identityId,
            address userWallet,
            string memory name,
            string memory idNumber,
            string memory documentHash,
            string memory documentCID,
            Status status,
            uint256 approvalCount
        )
    {
        Identity memory i = identities[msg.sender];

        return (
            i.identityId,
            i.userWallet,
            i.name,
            i.idNumber,
            i.documentHash,
            i.documentCID,
            i.status,
            i.approvalCount
        );
    }

    function getIdentity(address user)
        public
        view
        identityExists(user)
        canView(user)
        returns (
            uint256 identityId,
            address userWallet,
            string memory name,
            string memory idNumber,
            string memory documentHash,
            string memory documentCID,
            Status status,
            uint256 approvalCount
        )
    {
        Identity memory i = identities[user];

        return (
            i.identityId,
            i.userWallet,
            i.name,
            i.idNumber,
            i.documentHash,
            i.documentCID,
            i.status,
            i.approvalCount
        );
    }

    function getIdentityById(uint256 _identityId)
        public
        view
        returns (
            uint256 identityId,
            address userWallet,
            string memory name,
            string memory idNumber,
            string memory documentHash,
            string memory documentCID,
            Status status,
            uint256 approvalCount
        )
    {
        address user = identityIdToWallet[_identityId];
        require(identities[user].exists, "Identity not found");

        Identity memory i = identities[user];

        return (
            i.identityId,
            i.userWallet,
            i.name,
            i.idNumber,
            i.documentHash,
            i.documentCID,
            i.status,
            i.approvalCount
        );
    }

    function getHistoryCount(address user)
        public
        view
        identityExists(user)
        canView(user)
        returns (uint256)
    {
        return history[user].length;
    }

    function getHistory(address user, uint256 index)
        public
        view
        identityExists(user)
        canView(user)
        returns (
            address verifier,
            Status oldStatus,
            Status newStatus,
            uint256 timestamp,
            string memory remark
        )
    {
        require(index < history[user].length, "Invalid history index");

        VerificationHistory memory h = history[user][index];

        return (
            h.verifier,
            h.oldStatus,
            h.newStatus,
            h.timestamp,
            h.remark
        );
    }

    function getRevocationInfo(address user)
        public
        view
        identityExists(user)
        canView(user)
        returns (
            bool revoked,
            address revokedBy,
            uint256 revokedAt,
            string memory reason
        )
    {
        RevocationInfo memory r = revocationDetails[user];

        return (
            r.revoked,
            r.revokedBy,
            r.revokedAt,
            r.reason
        );
    }

    function isVerifier(address user) public view returns (bool) {
        return verifiers[user];
    }
}