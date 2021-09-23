// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract DStorage {
  string public name = "DStorage";    // NAME OF CONTRACT
  uint public fileCount = 0;    // #FILES 
  mapping(uint => File) public files;    // MAPPING fieldId=>Struct 
  
  // STRUCT
  struct File {
    uint fileId;
    string fileHash;
    uint fileSize;
    string fileType;
    string fileName;
    string fileDescription;
    uint uploadTime;
  }

  // EVENTS
  event FileUploaded(
    uint fileId,
    string fileHash,
    uint fileSize,
    string fileType,
    string fileName,
    string fileDescription,
    uint uploadTime
  );

  constructor() public {
  }

  // UPLOAD FILE
  function uploadFile(string memory _fileHash, 
                      uint _fileSize,
                      string memory _fileType,
                      string memory _fileName,
                      string memory _fileDescription) public {
    
    // CUSTOM REQUIREMENTS
    require(bytes(_fileHash).length > 0);           // HASH EXISTS
    require(bytes(_fileType).length > 0);           // TYPE EXISTS
    require(bytes(_fileDescription).length > 0);    // DESCRIPTION EXISTS
    require(bytes(_fileName).length > 0);           // NAME EXISTS
    require(msg.sender!=address(0));                // UPLOADER ADDRESS EXISTS
    require(_fileSize > 0);                         // SIZE > 0       

    fileCount++;
    files[fileCount] = File(fileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, block.timestamp);

    // TRIGGER EVENTS
    emit FileUploaded(fileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, block.timestamp);
  }
}