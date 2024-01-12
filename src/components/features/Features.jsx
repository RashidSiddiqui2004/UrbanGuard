
import React from 'react'
import FeatureCard from './FeatureCard'
import { motion } from 'framer-motion'
import feature1 from "./incident.jpg"
import feature2 from "./realMap.jpg";

const Features = () => {

    const features = [
        {
            featureTitle: "Incident Reporting Made Easy",
            featureDesc: "Effortlessly report incidents with our user-friendly interface. Share details, images, and location, empowering communities to act swiftly for safer neighborhoods.",
            featureIcon: feature1
        },
        {
            featureTitle: "Real-Time Incident Map",
            featureDesc: "Explore a dynamic map displaying real-time incident updates. Instantly grasp the current safety status of your area and stay informed about incidents as they occur.",
            featureIcon: feature2
        },
        {
            featureTitle: "Emergency Services Integration",
            featureDesc: "UrbanGuard serves as a central hub, connecting users with emergency services. Enhance coordination, streamline responses, and ensure a safer environment for all.",
            featureIcon: feature1
        },
        {
            featureTitle: "Community Forum",
            featureDesc: "Engage in meaningful discussions within our vibrant community forum. Share insights, tips, and concerns, fostering a collaborative environment for safer neighborhoods.",
            featureIcon: feature1
        },
        {
            featureTitle: "Safety Tips and Resources",
            featureDesc: "Access a wealth of safety tips and educational resources. Empower yourself and your community with knowledge that enhances overall safety and well-being.",
            featureIcon: feature1
        }

    ]

    return (
        <div className='mx-[10%]'>

            <motion.div
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                transition={{
                    duration: 1,
                    delay: 0.2,
                }}
                className='grid grid-cols-1 md:grid-cols-3 justify-center gap-10'>

                {features.map((item, index) =>
                (

                    <div key={index}>
                        <FeatureCard feature={item} />
                    </div>
                ))}

            </motion.div>
        </div>
    )
}

export default Features