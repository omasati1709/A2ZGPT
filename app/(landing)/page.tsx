import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      Landing Page
      <div>
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
