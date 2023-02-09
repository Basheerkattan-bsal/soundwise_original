import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Bouncer = ({ dependencies }) => {
  const navigate = useNavigate();
  useEffect(() => {
    dependencies?.map(dep => {
      if (!dep) {
        console.log("fuck me", dep);
        navigate("/");
      }
    });
  }, []);

  return <React.Fragment></React.Fragment>;
};

export default Bouncer;
