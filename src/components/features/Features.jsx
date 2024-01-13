
import React from 'react'
import FeatureCard from './FeatureCard'
import { motion } from 'framer-motion'
const incidentReporting = "https://res.cloudinary.com/drlkkozug/image/upload/v1705071166/xbfc2jxq4aq3gbt3zl7h.webp"
const realmapSystem = "https://res.cloudinary.com/drlkkozug/image/upload/v1705071167/cihkq6omas1ff97ico1i.jpg";
const community = "https://res.cloudinary.com/drlkkozug/image/upload/v1705071113/m7gmf7nnfffugridaxcl.jpg";
const resourcesImg = "https://res.cloudinary.com/drlkkozug/image/upload/v1705071145/zkudwjx4qiw9bejbugvv.webp";
const integration = "https://res.cloudinary.com/drlkkozug/image/upload/v1705071145/ylwt1akvolua5ggnrv3a.jpg"

const Features = () => {

    const features = [
        {
            featureTitle: "Incident Reporting Made Easy",
            featureDesc: "Effortlessly report incidents with our user-friendly interface. Share details, images, and location, empowering communities to act swiftly for safer neighborhoods.",
            featureIcon: incidentReporting
        },
        {
            featureTitle: "Real-Time Incident Map",
            featureDesc: "Explore a dynamic map displaying real-time incident updates. Instantly grasp the current safety status of your area and stay informed about incidents as they occur.",
            featureIcon: realmapSystem
        },
        {
            featureTitle: "Community Forum",
            featureDesc: "Engage in meaningful discussions within our vibrant community forum. Share insights, tips, and concerns, fostering a collaborative environment for safer neighborhoods.",
            featureIcon: community
        },
        {
            featureTitle: "Safety Tips and Resources",
            featureDesc: "Access a wealth of safety tips and educational resources. Empower yourself and your community with knowledge that enhances overall safety and well-being.",
            featureIcon: resourcesImg
        },
        {
            featureTitle: "Emergency Services Integration",
            featureDesc: "UrbanGuard serves as a central hub, connecting users with emergency services. Enhance coordination, streamline responses, and ensure a safer environment for all.",
            featureIcon: integration
        },
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
                className='grid grid-cols-1 md:grid-cols-3 justify-center h-full gap-10'>

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