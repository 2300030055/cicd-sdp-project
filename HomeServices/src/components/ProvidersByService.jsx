
import React from "react";
import "../Styles/ProvidersByService.css";
import { useParams, Link } from "react-router-dom";
import plumbingImg from "../assets/images/plumbing.jpeg";
import electricalImg from "../assets/images/electrical.jpeg";
import cleaningImg from "../assets/images/cleaning.jpeg";
import carpentryImg from "../assets/images/carpentry.webp";
import acheaterImg from "../assets/images/acheater.avif";
import gardeningImg from "../assets/images/gardening.jpeg";

const mockProviders = [
  // Plumbing
  { id: 1, name: "Ravi Plumbing Works", serviceId: 1, rating: 4.8 },
  { id: 7, name: "AquaFix Solutions", serviceId: 1, rating: 4.7 },
  { id: 8, name: "PipeMasters", serviceId: 1, rating: 4.6 },
  // Electrical Repairs
  { id: 2, name: "Sharma Electricians", serviceId: 2, rating: 4.6 },
  { id: 9, name: "BrightSpark Electricals", serviceId: 2, rating: 4.8 },
  { id: 10, name: "WattWorks", serviceId: 2, rating: 4.7 },
  // Cleaning
  { id: 3, name: "CleanSweep India", serviceId: 3, rating: 4.9 },
  { id: 11, name: "Spotless Pros", serviceId: 3, rating: 4.8 },
  { id: 12, name: "ShineTime Cleaners", serviceId: 3, rating: 4.7 },
  // Carpentry
  { id: 4, name: "Patel Carpentry", serviceId: 4, rating: 4.7 },
  { id: 13, name: "WoodCrafters", serviceId: 4, rating: 4.8 },
  { id: 14, name: "HandyHammer", serviceId: 4, rating: 4.6 },
  // AC/Heater Servicing
  { id: 5, name: "CoolCare AC Services", serviceId: 5, rating: 4.5 },
  { id: 15, name: "AirPro Experts", serviceId: 5, rating: 4.7 },
  { id: 16, name: "ClimateControl Co.", serviceId: 5, rating: 4.6 },
  // Gardening/Lawn Care
  { id: 6, name: "GreenLeaf Gardening", serviceId: 6, rating: 4.8 },
  { id: 17, name: "Lawn Legends", serviceId: 6, rating: 4.7 },
  { id: 18, name: "GardenGurus", serviceId: 6, rating: 4.6 },
];

const mockServices = [
  { id: 1, name: "Plumbing" },
  { id: 2, name: "Electrical Repairs" },
  { id: 3, name: "Cleaning" },
  { id: 4, name: "Carpentry" },
  { id: 5, name: "AC/Heater Servicing" },
  { id: 6, name: "Gardening/Lawn Care" },
];

function ProvidersByService() {
  const { serviceId } = useParams();
  const serviceIdNum = Number(serviceId);

  const providers = mockProviders.filter(p => p.serviceId === serviceIdNum);
  const serviceName = mockServices.find(s => s.id === serviceIdNum)?.name || "Service";

  // Map serviceId to image
  const serviceImages = {
    1: plumbingImg,
    2: electricalImg,
    3: cleaningImg,
    4: carpentryImg,
    5: acheaterImg,
    6: gardeningImg,
  };
  const serviceImg = serviceImages[serviceIdNum];

  return (
    <div className="providers-by-service-page">
      <h1>Providers for {serviceName}</h1>
      {serviceImg && (
        <img src={serviceImg} alt={serviceName} style={{ maxWidth: "350px", borderRadius: "12px", marginBottom: "1.5rem", boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }} />
      )}
      {providers.length === 0 ? (
        <p style={{ color: '#fff', fontSize: '1.2rem', margin: '2rem 0' }}>No providers available for this service.</p>
      ) : (
        <ul>
          {providers.map(provider => (
            <li key={provider.id}>
              <Link to={`/providers/${provider.id}`}>{provider.name} - Rating: {provider.rating}</Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/services" className="btn secondary">Back to Services</Link>
    </div>
  );
}

export default ProvidersByService;
