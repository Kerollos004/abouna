import React, { Suspense } from 'react'
import SideMenu from '@/app/components/timelinecomponents/SideMenu'
import RenderdData from '@/app/components/timelinecomponents/RenderdData'
import { supabase } from '@/app/assets/supabase_client';
async function TimelineContent({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params 
    
    if (!id) {
        return null;
    }



    const get_Abouna_Appointments = async () => {
        const { data, error } = await supabase.from("appointments").select("*").eq("abouna_id", id).order("created_at", { ascending: false });
        if (!data || error) {
            console.log("error in getting appointments", error?.message)
            return
        }
        if (data) {
            return data
        }
    }

    

    const appointments = await get_Abouna_Appointments() || []



    return (
        <main className="w-full" >
            <SideMenu  />
            <RenderdData appointments={appointments} />
        </main>
    );
}

export default function TimeLine({ params }: { params: Promise<{ id: string }> }) {
    return (
        <>
        <Suspense >
            <TimelineContent params={params} />
        </Suspense>
        </>
    )
}
