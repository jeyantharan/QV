import PrivateEvents from "@/components/sections/PrivateEvents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Parties & Events | QV Trattoria",
  description: "Host your next milestone at QV Trattoria. From bridal showers to corporate events, we offer a premium space and customized menus for any occasion.",
};

export default function EventsPage() {
  return (
    <div className="pt-20">
      <PrivateEvents />
    </div>
  );
}
