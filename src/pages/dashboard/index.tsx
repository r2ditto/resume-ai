import React, { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/utils/supabase";

import DashboardLayout from "@/components/layout/DashboardLayout";

import ResumeList from "@/components/ui/resume-list";

export default function Dashboard() {
  const { user } = useUser();
  const [resumes, setResumes] = useState<any[] | null>([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchResumes = async () => {
      try {
        const { data } = await supabase
          .from("resumes")
          .select("*")
          .eq("user_id", user?.id);

        setResumes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResumes();
  }, [user?.id]);

  return (
    <DashboardLayout>
      <ResumeList resumes={resumes} />
    </DashboardLayout>
  );
}
