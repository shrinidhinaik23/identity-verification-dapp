// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract IdentityVerification {

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    enum Status { Pending, Verified, Rejected }

    struct Identity {
        string name;
        string idNumber;
        string documentHash;
        Status status;
    }

    mapping(address => Identity) public identities;

    function addIdentity(string memory _name, string memory _id, string memory _hash) public {
        identities[msg.sender] = Identity(_name, _id, _hash, Status.Pending);
    }

    function verifyIdentity(address user) public {
        require(msg.sender == admin, "Only admin");
        identities[user].status = Status.Verified;
    }

    function getMyIdentity() public view returns (string memory, string memory, string memory, Status) {
        Identity memory i = identities[msg.sender];
        return (i.name, i.idNumber, i.documentHash, i.status);
    }
}