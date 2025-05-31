import { useState, useEffect } from 'react';
import { IoReturnDownBack } from "react-icons/io5";
import { Link } from "react-router";
import { courseModules } from '../utils/materiDummy';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";

function EducationPage() {
    const [selectedModule, setSelectedModule] = useState(0);
    const [selectedSubmodule, setSelectedSubmodule] = useState(0);
    const [expandedModules, setExpandedModules] = useState([0]);
    const [content, setContent] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    
    useEffect(() => {
        if (courseModules.length > 0 && courseModules[0].submodules.length > 0) {
            setContent(courseModules[0].submodules[0].content);
        }
    }, []);

    const handleModuleClick = (moduleIndex) => {
        if (expandedModules.includes(moduleIndex)) {
            setExpandedModules(expandedModules.filter(idx => idx !== moduleIndex));
        } else {
            setExpandedModules([...expandedModules, moduleIndex]);
        }

        setSelectedModule(moduleIndex);
        setSelectedSubmodule(0);
        setContent(courseModules[moduleIndex].submodules[0].content);
    };
    
    const handleSubmoduleClick = (moduleIndex, submoduleIndex) => {
        setSelectedModule(moduleIndex);
        setSelectedSubmodule(submoduleIndex);
        setContent(courseModules[moduleIndex].submodules[submoduleIndex].content);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    
    const formatContent = (content) => {
        if (!content) return null;
        
        return content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
        ));
    };

    return (
        <div className="w-full min-h-svh bg-[#FFEBC8] flex relative">
            <Link to="/home" className="absolute top-6 left-6">
                <IoReturnDownBack className="cursor-pointer w-8 h-8 text-gray-800 hover:text-orange-600 transition-colors" />
            </Link>
            
            <button 
                className="fixed top-6 right-6 z-20 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg transition-all duration-300"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                <HiMenuAlt2 className="w-6 h-6" />
            </button>
            
            <div className={`flex-1 flex flex-col px-4 md:px-8 py-16 overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'mr-0 md:mr-80' : 'mr-0'}`}>
                <div className="max-w-3xl mx-auto w-full">
                    <h1 className="text-3xl font-bold mb-2 text-gray-800">
                        {courseModules[selectedModule]?.moduleTitle}
                    </h1>
                    <h2 className="text-xl font-semibold mb-6 text-gray-700">
                        {courseModules[selectedModule]?.submodules[selectedSubmodule]?.title}
                    </h2>
                    <div className="p-6">
                        {formatContent(content)}
                    </div>
                </div>
            </div>
            
            <div 
                className={`fixed top-0 right-0 h-full z-10 bg-[#FFF6E6] border-l border-orange-200 shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                } w-full sm:w-80`}
            >
                <div className="p-4 pt-16">
                    <div className="mb-6 border-b border-orange-200 pb-2">
                        <h2 className="text-xl font-bold text-center text-gray-800">Materi Pembelajaran</h2>
                    </div>
                    
                    <div className="space-y-2">
                        {courseModules.map((module, moduleIndex) => (
                            <div key={moduleIndex} className="border-b border-orange-100 pb-1 last:border-b-0">
                                <div 
                                    className={`flex items-center justify-between p-2 cursor-pointer rounded-md ${
                                        selectedModule === moduleIndex && selectedSubmodule === 0 
                                        ? 'bg-orange-100 text-orange-800' 
                                        : 'hover:bg-orange-50'
                                    }`}
                                    onClick={() => handleModuleClick(moduleIndex)}
                                >
                                    <span className="font-medium">{module.moduleTitle}</span>
                                    {expandedModules.includes(moduleIndex) ? (
                                        <IoIosArrowDown className="text-orange-500" />
                                    ) : (
                                        <IoIosArrowForward className="text-orange-500" />
                                    )}
                                </div>
                            
                                {expandedModules.includes(moduleIndex) && (
                                    <div className="ml-4 space-y-1 mt-1 mb-2">
                                        {module.submodules.map((submodule, subIndex) => (
                                            <div 
                                                key={subIndex}
                                                className={`py-1.5 px-3 cursor-pointer rounded-md text-sm ${
                                                    selectedModule === moduleIndex && selectedSubmodule === subIndex
                                                    ? 'bg-orange-100 text-orange-800 font-medium' 
                                                    : 'hover:bg-orange-50'
                                                }`}
                                                onClick={() => handleSubmoduleClick(moduleIndex, subIndex)}
                                            >
                                                {submodule.title}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EducationPage;