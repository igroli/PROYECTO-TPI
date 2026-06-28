import { useEffect, useState } from "react";
import { AboutUsCard } from "../../business/aboutUsCard/AboutUsCard";
import "./AboutUs.css";

const AboutUs = () => {
  const [agents, setAgents] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/agents')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`El servidor ha respondido con status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setAgents(data);
        } else {
          console.error("Data recibida no es un array:", data);
          setAgents([]);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setAgents([]);
      });
  }, []);

  return (
    <div className="about">
      {agents?.map((agent) => {
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
