"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

async function fetchExams() {
    const res = await fetch("/api/exam");
    if (!res.ok) {
        throw new Error("failed to fetch the exam loop");
    }

    const data = await res.json();
    return data;
}

export default function ExamLoop() {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        async function loadExams() {
            try {
                const fetchedExams = await fetchExams();
                setExams(fetchedExams);
            } catch (err) {
                throw new Error(`error fetching exams |:| ${err}`);
            }
        }
        loadExams();
    }, []);

    return (
        <div className="container mx-auto mt-10">
            <div className="flex gap-4">
                {exams.map((exam) => (
                    <div className="sm:w-1/2 md:w-1/4 w-shadow p-4 relative" key={exam._id}>
                        <h2 className="font-medium text-lg">{exam.title}</h2>
                        <Link className="absolute top-0 left-0 right-0 bottom-0" href={exam.slug}><span className="sr-only">Learn More About {exam.title}</span></Link>
                    </div>
                ))}
            </div>
        </div>
    )
}