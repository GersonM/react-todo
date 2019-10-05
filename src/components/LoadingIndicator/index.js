import React from 'react';
import { Spin } from "antd";

const LoadingIndicator = () => (
  <div style={{backgroundColor:"rgba(255,255,255,0.6)",justifyContent:"center", padding:"150px 0", display:"flex",width:"100%", height:"100%", position:"fixed", zIndex:9}}>
    <Spin />
  </div>
);

export default LoadingIndicator;
