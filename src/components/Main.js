import React, { Component } from 'react';
import { convertBytes } from './helpers';
import './Main.css';
import moment from 'moment';
import DetailModal from './DetailModal';
import { IoInformationCircle } from 'react-icons/io5';
import { MdOpenInNew } from 'react-icons/md';


class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5 text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto">
            <div className="content">
              <div className='form-card card mb-2 mx-auto'>
                <div className='text-monospace py-2 bg-warning'>
                  <h2 className='mb-0'><b>Share Files</b></h2>
                </div>
                
                {/* FORM */}
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const description = this.fileDescription.value
                  this.props.uploadFile(description);
                }}>
                  <div className='form-group mx-3 my-3'>
                    <input
                      id="fileDescription"
                      type="text"
                      ref={(input) => {this.fileDescription = input}}
                      className="form-control text-monospace"
                      placeholder="Description..."
                      required
                    />
                  </div>

                  <div className='form-group m-3'>  
                    <input type="file" onChange={this.props.captureFile} className="text-monospace" />
                  </div>

                  <button type='submit' className='btn btn-success btn-block upload-btn'><b>Upload!</b></button>
                </form>
              </div>
              <hr className='my-5'/>
              {/* FILES */}
              <div className='row align-items-stretch'>
                {this.props.files.map((file, key) => {
                  return (
                    // {if(file.fileType==="application/vnd.openxmlformats-officedocument.wordprocessingml.document	")}
                    // <thead style={{ 'fontSize': '12px' }} key={key}>
                    //   <tr>
                    //     <td>{file.fileId}</td>
                    //     <td>{file.fileName}</td>
                    //     <td>{file.fileDescription}</td>
                    //     <td>{file.fileType}</td>
                    //     <td>{convertBytes(file.fileSize)}</td>
                    //     <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                    //     <td>
                    //       <a
                    //         href={"https://etherscan.io/address/" + file.uploader}
                    //         rel="noopener noreferrer"
                    //         target="_blank">
                    //         {file.uploader.substring(0, 10)}...
                    //       </a>
                    //     </td>
                    //     <td>
                    //       <a
                    //         href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                    //         rel="noopener noreferrer"
                    //         target="_blank">
                    //         {file.fileHash.substring(0, 10)}...
                    //       </a>
                    //     </td>
                    //   </tr>
                    // </thead>
                    <div className='mb-3 col-2' key={key}>
                      <div className='card h-100 text-center p-0'>
                        {/* TODO: ADD ICONS */}
                        <div className="card-body d-flex align-items-center justify-content-center my-1 p-0">
                          <p className="card-title my-2 file-name">{file.fileName.length>20 ? file.fileName.substring(0,15)+"..." : file.fileName}</p>
                        </div>
                        <div className="card-footer m-0 p-0 row">
                          <button className='col-8 btn btn-secondary p-1 det' onClick={() => console.log(file)}><IoInformationCircle /> <span>Details</span></button>
                          <a className='col-4 btn btn-success p-1 m-0 down' href={"https://ipfs.infura.io/ipfs/" + file.fileHash} rel="noopener noreferrer" target="_blank"><MdOpenInNew /></a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* ITEMS TABLE */}
              {/* <table className="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px'}}>
                <thead style={{ 'fontSize': '15px' }}>
                  <tr className="bg-dark text-white">
                    <th scope="col" style={{ width: '10px' }}>id</th>
                    <th scope="col" style={{ width: '200px' }}>name</th>
                    <th scope="col" style={{ width: '230px' }}>description</th>
                    <th scope="col" style={{ width: '120px' }}>type</th>
                    <th scope="col" style={{ width: '90px' }}>size</th>
                    <th scope="col" style={{ width: '90px' }}>date</th>
                    <th scope="col" style={{ width: '120px' }}>uploader/view</th>
                    <th scope="col" style={{ width: '120px' }}>hash/view/get</th>
                  </tr>
                </thead>

                {this.props.files.map((file, key) => {
                  return (
                    <thead style={{ 'fontSize': '12px' }} key={key}>
                      <tr>
                        <td>{file.fileId}</td>
                        <td>{file.fileName}</td>
                        <td>{file.fileDescription}</td>
                        <td>{file.fileType}</td>
                        <td>{convertBytes(file.fileSize)}</td>
                        <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                        <td>
                          <a
                            href={"https://etherscan.io/address/" + file.uploader}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.uploader.substring(0, 10)}...
                          </a>
                        </td>
                        <td>
                          <a
                            href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.fileHash.substring(0, 10)}...
                          </a>
                        </td>
                      </tr>
                    </thead>
                  )
                })}
              </table> */}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;