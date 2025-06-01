import { useState, useEffect } from 'react';
import { IoReturnDownBack } from "react-icons/io5";
import { Link } from "react-router";
import { courseModules } from '../utils';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
import { FaBookOpen, FaGraduationCap } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";

function EducationPage() {
    const [selectedModule, setSelectedModule] = useState(0);
    const [selectedSubmodule, setSelectedSubmodule] = useState(0);
    const [expandedModules, setExpandedModules] = useState([0]);
    const [content, setContent] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
      useEffect(() => {
        setIsLoading(true);
        if (courseModules.length > 0 && courseModules[0].submodules.length > 0) {
            setContent(courseModules[0].submodules[0].content);
            // Simulate loading content
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } else {
            setIsLoading(false);
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
        setIsLoading(true);
        setSelectedModule(moduleIndex);
        setSelectedSubmodule(submoduleIndex);
        
        // Add a small delay to simulate content loading
        setTimeout(() => {
            setContent(courseModules[moduleIndex].submodules[submoduleIndex].content);
            setIsLoading(false);
        }, 300);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
      const formatContent = (content) => {
        if (!content) return null;
        
        return content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-6 leading-relaxed text-gray-700">{paragraph}</p>
        ));
    };    return (
        <div className="w-full min-h-svh bg-gradient-to-br from-[#FFF8E9] to-[#FFEBC8] flex relative">
            <div className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-orange-400 to-orange-500 shadow-md z-10">
                <Link to="/home" className="absolute top-4 left-6 flex items-center gap-2">
                    <IoReturnDownBack className="cursor-pointer w-7 h-7 text-white hover:text-orange-100 transition-colors" />
                    <span className="text-white font-medium">Kembali</span>
                </Link>
                
                <button 
                    className="fixed top-4 right-6 z-20 cursor-pointer flex items-center justify-center bg-white hover:bg-orange-50 text-orange-500 p-2 rounded-full shadow-lg transition-all duration-300"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <HiMenuAlt2 className="w-6 h-6" />
                </button>
            </div>
            
            <div className={`flex-1 flex flex-col pt-24 px-4 md:px-8 pb-16 overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'mr-0 md:mr-80' : 'mr-0'}`}>
                <div className="max-w-3xl mx-auto w-full">
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <div className="flex items-center mb-2 text-orange-500">
                            <FaGraduationCap className="w-6 h-6 mr-2" />
                            <h1 className="text-3xl font-bold text-gray-800">
                                {courseModules[selectedModule]?.moduleTitle}
                            </h1>
                        </div>
                        
                        <div className="flex items-center mb-4">
                            <FaBookOpen className="w-5 h-5 mr-2 text-orange-400" />
                            <h2 className="text-xl font-semibold text-gray-700">
                                {courseModules[selectedModule]?.submodules[selectedSubmodule]?.title}
                            </h2>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-6">
                            <MdOutlineWatchLater className="w-4 h-4 mr-1" />
                            <span>Estimasi waktu baca: {Math.ceil(content?.length / 1000)} menit</span>
                        </div>
                          <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                                    <p className="text-orange-500">Memuat konten...</p>
                                </div>
                            ) : (
                                formatContent(content)
                            )}
                        </div>
                    </div>
                </div>
            </div>
              <div 
                className={`fixed top-0 right-0 h-full z-10 bg-white border-l border-orange-200 shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                } w-full sm:w-80`}
            >
                <div className="p-4 pt-20 bg-gradient-to-b from-orange-50 to-white">
                    <div className="mb-6">
                        <div className="flex items-center justify-center gap-2 p-3 bg-orange-500 rounded-lg shadow-md text-white">
                            <FaBookOpen className="w-5 h-5" />
                            <h2 className="text-xl font-bold">Materi Pembelajaran</h2>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        {courseModules.map((module, moduleIndex) => (
                            <div key={moduleIndex} className="bg-white rounded-lg shadow-sm border border-orange-100 overflow-hidden mb-2">
                                <div 
                                    className={`flex items-center justify-between p-3 cursor-pointer ${
                                        selectedModule === moduleIndex && selectedSubmodule === 0 
                                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' 
                                        : 'bg-orange-50 hover:bg-orange-100 text-gray-800'
                                    }`}
                                    onClick={() => handleModuleClick(moduleIndex)}
                                >
                                    <span className="font-medium">{module.moduleTitle}</span>
                                    {expandedModules.includes(moduleIndex) ? (
                                        <IoIosArrowDown className={selectedModule === moduleIndex ? "text-white" : "text-orange-500"} />
                                    ) : (
                                        <IoIosArrowForward className={selectedModule === moduleIndex ? "text-white" : "text-orange-500"} />
                                    )}
                                </div>
                            
                                {expandedModules.includes(moduleIndex) && (
                                    <div className="bg-white">
                                        {module.submodules.map((submodule, subIndex) => (
                                            <div 
                                                key={subIndex}
                                                className={`py-2.5 px-4 cursor-pointer border-t border-orange-50 ${
                                                    selectedModule === moduleIndex && selectedSubmodule === subIndex
                                                    ? 'bg-orange-100 text-orange-800 font-medium border-l-4 border-l-orange-500' 
                                                    : 'hover:bg-orange-50'
                                                }`}
                                                onClick={() => handleSubmoduleClick(moduleIndex, subIndex)}
                                            >
                                                <div className="flex items-center">
                                                    <div className={`w-2 h-2 rounded-full mr-2 ${
                                                        selectedModule === moduleIndex && selectedSubmodule === subIndex
                                                        ? 'bg-orange-500'
                                                        : 'bg-gray-300'
                                                    }`}></div>
                                                    {submodule.title}
                                                </div>
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