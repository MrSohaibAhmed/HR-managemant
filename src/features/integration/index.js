import { useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { showNotification } from "../common/headerSlice"


const INITIAL_INTEGRATION_LIST = [
    { name: "Slack", icon: "https://cdn-icons-png.flaticon.com/512/2111/2111615.png", isActive: true, description: "Slack is an instant messaging program designed by Slack Technologies and owned by Salesforce." },
    { name: "Facebook", icon: "https://cdn-icons-png.flaticon.com/512/124/124010.png", isActive: false, description: "Meta Platforms, Inc., doing business as Meta and formerly named Facebook, Inc., and TheFacebook." },
    { name: "Linkedin", icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png", isActive: true, description: "LinkedIn is a business and employment-focused social media platform that works through websites and mobile apps." },
    { name: "Google Ads", icon: "https://cdn-icons-png.flaticon.com/512/2301/2301145.png", isActive: false, description: "Google Ads is an online advertising platform developed by Google, where advertisers bid to display brief advertisements, service offerings" },
    { name: "Gmail", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968534.png", isActive: false, description: "Gmail is a free email service provided by Google. As of 2019, it had 1.5 billion active users worldwide." },
    { name: "Salesforce", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968880.png", isActive: false, description: "It provides customer relationship management software and applications focused on sales, customer service, marketing automation." },
    { name: "Hubspot", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968872.png", isActive: false, description: "American developer and marketer of software products for inbound marketing, sales, and customer service." },
]

function Integration() {

    const dispatch = useDispatch()

    const [integrationList, setIntegrationList] = useState(INITIAL_INTEGRATION_LIST)


    const updateIntegrationStatus = (index) => {
        let integration = integrationList[index]
        setIntegrationList(integrationList.map((i, k) => {
            if (k === index) return { ...i, isActive: !i.isActive }
            return i
        }))
        dispatch(showNotification({ message: `${integration.name} ${integration.isActive ? "disabled" : "enabled"}`, status: 1 }))
    }


    return (
        <>
            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                        <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Anouncements</h2>
                        <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
                    </div>
                    <div class="grid gap-8 lg:grid-cols-2">
                        <article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex justify-between items-center mb-5 text-gray-500">
                                <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                    <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                    Tutorial
                                </span>
                                <span class="text-sm">14 days ago</span>
                            </div>
                            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">Tomorrow will be off</a></h2>
                            <p class="mb-5 font-light text-gray-500 dark:text-gray-400">Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.</p>
                            <div class="flex justify-between items-center">
                                <div class="flex items-center space-x-4">
                                    <img class="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                                    <span class="font-medium dark:text-white">
                                        Wajahat
                                    </span>
                                </div>
                                <a href="#" class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    Read more
                                    <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </a>
                            </div>
                        </article>
                        <article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex justify-between items-center mb-5 text-gray-500">
                                <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                    <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                                    Article
                                </span>
                                <span class="text-sm">14 days ago</span>
                            </div>
                            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">Tomorrow will be off</a></h2>
                            <p class="mb-5 font-light text-gray-500 dark:text-gray-400">Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.</p>
                            <div class="flex justify-between items-center">
                                <div class="flex items-center space-x-4">
                                    <img class="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="Bonnie Green avatar" />
                                    <span class="font-medium dark:text-white">
                                        Wajahat
                                    </span>
                                </div>
                                <a href="#" class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    Read more
                                    <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* {
                integrationList.map((i, k) => {
                    return(
                        <TitleCard key={k} title={i.name} topMargin={"mt-2"}>
                            
                            <p className="flex">
                                <img alt="icon" src={i.icon} className="w-12 h-12 inline-block mr-4" />
                                {i.description}
                            </p>
                            <div className="mt-6 text-right">
                                <input type="checkbox" className="toggle toggle-success toggle-lg" checked={i.isActive} onChange={() => updateIntegrationStatus(k)}/>
                            </div>
                            
                        </TitleCard>
                    )
                
                })
            } */}
            </div>
        </>
    )
}

export default Integration