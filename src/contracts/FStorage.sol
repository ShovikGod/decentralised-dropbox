// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract FStorage {
  // NAME OF CONTRACT
  string public name = "FStorage";
  // #FILES 
  uint public fileCount = 0;
  // MAPPING fieldId=>Struct 
  mapping(uint => File) public files;
  
  // FILE ATTRIBUTES
  struct File {
    uint fileId;
    string fileHash;
    uint fileSize;
    string fileType;
    string fileName;
    string fileDescription;
    uint uploadTime;
    address payable uploader;
  }

  // FILE EVENTS
  event FileUploaded(
    uint fileId,
    string fileHash,
    uint fileSize,
    string fileType,
    string fileName,
    string fileDescription,
    uint uploadTime,
    address payable uploader
    
  );

  constructor() public {
  }

  // UPLOAD FILE
  function uploadFile(
    string memory _fHash,
    uint _fSize,
    string memory _fType,
    string memory _fName,
    string memory _fDescription
  ) public {
    
    // BASIC VALIDATIONS
    // -HASH REQUIRED
        require(bytes(_fHash).length > 0);

    // -TYPE REQUIRED
        require(bytes(_fType).length > 0);

    // -DESCRIPTION REQUIRED
        require(bytes(_fDescription).length > 0);

    // -NAME REQUIRED        
        require(bytes(_fName).length > 0);

    // -UPLOADER ADDRESS REQUIRED
        require(msg.sender!=address(0));

    // -NON-ZERO SIZE          
        require(_fSize > 0);             

    fileCount++;
    files[fileCount] = File(fileCount, _fHash, _fSize, _fType, _fName, _fDescription, block.timestamp, payable(msg.sender));

    // TRIGGER EVENTS
    emit FileUploaded(fileCount, _fHash, _fSize, _fType, _fName, _fDescription, block.timestamp, payable(msg.sender));
  }
}