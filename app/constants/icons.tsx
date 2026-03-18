import { FaAws, FaServer } from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { TbBrandAzure } from "react-icons/tb";

export const CLOUD_LOGOS = {
  AWS: <FaAws className="w-full h-full" />,
  Azure: <TbBrandAzure className="w-full h-full" />,
  Google: <SiGooglecloud className="w-full h-full" />,
  OnPremise: <FaServer className="w-full h-full" />,
};