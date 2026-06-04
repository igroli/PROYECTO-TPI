import { useEffect, useState } from "react";
import { AboutUsCard } from "../../business/aboutUsCard/AboutUsCard";
import "./AboutUs.css";

const AboutUs = () => {
  const [agents, setAgents] = useState([]);
  const url = `http://localhost:3000/agents`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAgents(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="about">
      {agents.map((agent) => {
        return(
        <AboutUsCard key={agent.id_users} 
        name={agent.name} 
        last_name={agent.last_name}
        image_url={agent.image_url}
        email={agent.email}
        phone_number={agent.phone_number}
        />)
      })}
    </div>
  );
};

export default AboutUs;
