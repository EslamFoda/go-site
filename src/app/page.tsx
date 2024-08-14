"use client";
import { supabase } from "@/config/supabase";
import Link from "next/link";
import React, { useEffect } from "react";

export default function Home() {
  const [todos, setTodos] = React.useState<any>([]);
  const fetch = async () => {
    let { data, error } = await supabase.from("todos").select("*");
    if (error) {
      console.log(error);
    } else {
      console.log(data, "asd");
      setTodos(data);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <main>
      <div>create site is gonna be here</div>
      <Link href="/editor">test</Link>
    </main>
  );
}
