import React from 'react';
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import sampleVideo from '../assets/videos/video.mp4';
const VideoPrueba = () => {
    return (
        <div className="flex items-center justify-center  flex-wrap px-10  h-fit  ">
            <div className="w-[90vw] h-full ">
                <Card className="w-full h-full flex-col lg:flex-row min-w-[230px]">
                    <CardHeader
                        shadow={false}
                        floated={false}
                        className="m-0 w-full max-h-[500px] lg:w-2/5 shrink-0 rounded-r-none flex items-center justify-center"
                    >
                        
                        <video 
                            src={sampleVideo} 
                            autoPlay 
                            
                            muted 
                            controls 
                            className='h-[90%] max-h[200px] object-cover min-w-[300px] hidden  videopoint:block'
                        >
                            Tu navegador no soporta la etiqueta de video.
                        </video>
                    </CardHeader>
                    <CardBody className='flex flex-col justify-center'>
                        <Typography variant="h6" color="gray" className="mb-4 uppercase">
                            Lorem
                        </Typography>
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            Lorem ipsum dolor sit amet consect
                        </Typography>
                        <Typography color="gray" className="mb-8 font-normal">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum ducimus animi quia distinctio magnam inventore ea, dolorem nobis explicabo alias soluta est enim facilis commodi temporibus eligendi sint suscipit veniam.
                        </Typography>
                        <a href="#" className="inline-block">
                            <Button variant="text" className="flex items-center gap-2">
                                Lorem ipsum dolo
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                        </a>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default VideoPrueba;
