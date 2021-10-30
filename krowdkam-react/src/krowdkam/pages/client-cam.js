import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
import "../styles/client-cam.css";
import { toast } from "react-toastify";


const ClientCam = ({organization}) =>{

    let { zoneId } = useParams();
    console.log("Zones are : ",zoneId)
    const webcamRef = React.useRef(null);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
      const capture = React.useCallback(
        () => {
          const imageSrc = webcamRef.current.getScreenshot();
          console.log("Image is: ",imageSrc)
        //   let file = new File(imageSrc, "Organization")
        // let blob = new Blob([imageSrc], {
        //     type: "image/png"
        // });
        // let file = base64_to_jpeg(imageSrc,"Done.png");
    //         console.log("File is: ",file)
    //     let formData = new FormData();
    //    formData.append("file",file);
    //     console.log("FormData is: ",formData)
        // axios.post('/client/file_upload/',formData)
        // .then(res=>{
        //     console.log("Res is: ",res);
        //     let body = {
        //         oid:1,
        //         zid:1,
        //         iid:1
        //     }
        //     axios.get("/client/crowd_count/?oid=1&&zid=1&&iid=1&&position=Home")
        //     .then(res=>{
        //         console.log("Total count detected: ",res);
        //     })
        // })

        },
        [webcamRef]
      );

    useEffect(()=>{
        const timer = setInterval(() => {
            // console.log('This will run after 1 second!')
            // capture();
          }, 5000);
          return () => clearInterval(timer);
    },[])

    // const [zoneId,setZoneId] = useState(zoneId);
    const [camId,setCamId] = useState(1);

    // useEffect(()=>{

    // },[])
    // const  base64_to_jpeg = ($base64_string, $output_file)=>{
    //     // open the output file for writing
    //     $ifp = fopen( $output_file, 'wb' ); 
    
    //     // split the string on commas
    //     // $data[ 0 ] == "data:image/png;base64"
    //     // $data[ 1 ] == <actual base64 string>
    //     $data = explode( ',', $base64_string );
    
    //     // we could add validation here with ensuring count( $data ) > 1
    //     fwrite( $ifp, base64_decode( $data[ 1 ] ) );
    
    //     // clean up the file resource
    //     fclose( $ifp ); 
    
    //     return $output_file; 
    // }
    const [ data, setData] = useState({
        fname:"",
        lname:"",
        bdate:""
    })
    const [ file, setFile] = useState(null)

    const handler = (e)=>{
        console.log(e.target.id,e.target.value);
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    const sendData = ()=>{
        console.log("Sending: ",data,file)
        let formData = new FormData();
        formData.append('file',file);
        console.log(formData,file);
        let url = '/api/testFormPost';
        axios.post('/client/file_upload/',formData)
        .then((res)=>{
            console.log("Yes data stored:", res.data.id);
            // Replace zoneId with 3
            axios.get(`/client/crowd_count/?oid=1&&zid=${zoneId}&&iid=${res.data.id}&&position=Home`)
            .then(res=>{
                console.log("Total count detected: ",res.data);
                toast.success(`Image has been uploaded`);

            })
        })

    }

    return (
        <div className="main-div">
            <div className="cam-div">
                {/* <Webcam
                audio={false}
                height={500}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={500}
                videoConstraints={videoConstraints}/> */}
                {/* <button onClick={capture}>Capture photo</button> */}<form onSubmit={(e)=>{e.preventDefault(); sendData();}} style={{lineHeight:'2rem'}}>
                {/* <img src={Logo} id = "upload-image"/><br/> */}
                {/* <label>Upload Image: </label> */}
                <input onChange={(e)=>{
                    console.log(e.target.files,data);
                    if (e.target.files && e.target.files[0]) {
                        setFile(e.target.files[0]);
                        
            
                    } 
                    // setFile(e.target.files);
                }}  type='file' name='file'/><br/>
                {/* <label>First-Name: </label>
                <input onChange={(e)=> handler(e)} type="text" name="fname" id="fname" value={data.fname}/><br/>
                <label>Last-Name: </label>
                <input onChange={(e)=> handler(e)} type='text' name='lname' id="lname" value={data.lname}/><br/>
                <label>Birth-Date: </label>
                <input  onChange={(e)=> handler(e)} type='date' name='bdate' id="bdate"/>
                <br/> */}
                <button type="Submit">Submit</button>
            </form>

            </div>
        </div>
    );

}

export default ClientCam;