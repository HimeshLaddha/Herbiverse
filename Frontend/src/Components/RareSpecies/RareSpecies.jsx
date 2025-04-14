import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HerbCard from "../../Components/Herb/Herbcard";
import plantData from "../Herb/Getplantdata.json";
import { FaLeaf, FaSearch, FaFilter } from "react-icons/fa";

function RareSpecies() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHerb, setSelectedHerb] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewType, setViewType] = useState("3d");
  const [activePanelType, setActivePanelType] = useState("description");

  const allCategories = [
    "All", "Rare Botanical Treasure"
  ];

  const navigate = useNavigate();

  // 🏗️ Function to format plant data with more comprehensive information
  const formatPlantData = () => {
    const allPlants = [
      "ceropegia mahabalei", "ficusginseng", "palmtree"
    ];

    return allPlants.map(plantName => {
      const existingPlant = plantData.find(p =>
        p.name.toLowerCase() === plantName.toLowerCase() ||
        p.name.toLowerCase().includes(plantName.toLowerCase())
      );

      return {
        id: plantName.toLowerCase().replace(/\s+/g, '_'),
        name: existingPlant?.name || plantName.charAt(0).toUpperCase() + plantName.slice(1),
        scientificName: existingPlant?.scientificName || getScientificName(plantName),
        description: existingPlant?.description || "A medicinal plant with various health benefits.",
        image: `/images/${plantName.toLowerCase().replace(/\s+/g, '_')}.jpg`,
        modelPath: `/models/${plantName.toLowerCase().replace(/\s+/g, '')}.glb`,
        careInstructions: existingPlant?.careInstructions || ["Water regularly and place in partial sunlight."],
        family: existingPlant?.family || "Not available",
        origin: existingPlant?.origin || "Native to various regions",
        type: existingPlant?.type || "Perennial plant",
        hindiName: existingPlant?.hindiName || "",
        marathiName: existingPlant?.marathiName || "",
        foundInMaharashtra: existingPlant?.foundInMaharashtra || ["Western Ghats", "Sahyadri Range"],
        uses: existingPlant?.uses || ["Used in traditional medicine", "Has ornamental value"],
        warnings: existingPlant?.warnings || [],
        growingConditions: existingPlant?.growingConditions || "Prefers partial sunlight with regular watering",
        category: getCategoriesForPlant(plantName)
      };
    });
  };

  // 🌱 Function to get scientific names
  const getScientificName = (plantName) => {
    const scientificNames = {
      "ceropegiamahabalei": "Ceropegia mahabalei", 
      "ficusginseng": "Ficus microcarpa",
      "palmtree": "Arecaceae family"
    };
    return scientificNames[plantName.toLowerCase().replace(/\s+/g, '')] || "Scientific name unavailable";
  };

  // 🏷️ Function to get categories for each plant
  const getCategoriesForPlant = (plantName) => {
    const categories = [];
    const name = plantName.toLowerCase();
    if (["ceropegia mahabalei", "ficusginseng", "palmtree"].includes(name)) categories.push("Rare Botanical Treasure");

    if (categories.length === 0) categories.push("Medicinal Herbs");

    return categories;
  };

  const herbsData = formatPlantData();

  // 🔎 Filter herbs based on search & category
  const filteredHerbs = useMemo(() => {
    return herbsData.filter(herb => {
      const matchesSearch = herb.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || herb.category.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [herbsData, searchQuery, selectedCategory]);

  // 📌 Group herbs by category
  const groupedHerbs = useMemo(() => {
    if (selectedCategory !== "All") return { [selectedCategory]: filteredHerbs };

    return filteredHerbs.reduce((acc, herb) => {
      herb.category.forEach(cat => {
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(herb);
      });
      return acc;
    }, {});
  }, [filteredHerbs, selectedCategory]);

  const handleViewDetails = (herb, viewType) => {
    // Set the returnTo path in sessionStorage
    sessionStorage.setItem('returnTo', '/RareSpecies');
  
    // Set herb details and view type for the modal
    setSelectedHerb(herb);
    setViewType(viewType);
  
    // Open the modal
    setModalOpen(true);
  
    // If you're navigating to a new page for model viewing, you can also pass returnTo in state:
    // Example: navigate('/modelviewer', { state: { herb, viewType, returnTo: '/rarespecies' } });
  };
  

  const closeModal = () => {
    setModalOpen(false);
    setSelectedHerb(null);
  };

  const toggleViewType = (type) => {
    setViewType(type);
  };

  // Set active panel type
  const setActivePanel = (panelType) => {
    setActivePanelType(panelType);
  };

  return (
    <div className="bg-gradient-to-b from-[#FFFAF7] to-[#DCFCE7] fixed overflow-y-auto inset-0 min-h-screen text-center py-12 px-4 font-merriwether">
      <div className="flex justify-center items-center">
        <div className="text-center w-[95vw] flex flex-col items-center mt-[30px]">
          <div className="flex items-center justify-center mb-2 mt-5">
            <FaLeaf className="text-[#2D513E] mr-2 text-3xl" />
            <h1 className="text-4xl font-bold text-[#2D513E]">Herb Catalog - Rare Species</h1>
          </div>
          <h2 className="text-xl mt-2 font-semibold text-[#7EA172] italic">
            Nature's Healing Wisdom • Curated Collection
          </h2>

          {/* 🔍 Search & Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-2xl mx-auto mt-6 gap-3">
            <input
              type="text"
              placeholder="Search for a herb..."
              className="w-full py-3 pl-5 pr-12 border border-[#7EA172] rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select className="w-full sm:w-56 py-3 px-4 border border-[#7EA172] rounded-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <p className="mt-6 text-gray-700 max-w-4xl mx-auto leading-relaxed italic text-lg">
        Discover nature's botanical treasures — a premium collection of medicinal plants with detailed profiles,
        healing properties, and cultivation insights for your holistic wellness journey.
      </p>
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#7EA172] to-transparent my-8 max-w-6xl mx-auto"></div>

      {/* 🌱 Display Herbs */}
      <div className="mt-6 px-4">
        {Object.entries(groupedHerbs).map(([category, herbs], index, array) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-semibold text-[#2D513E] mb-3">{category} 🌿</h2>
            <div className="flex overflow-x-auto space-x-4 px-4 py-2 scrollbar-hide justify-center">
              {herbs.map(herb => <HerbCard key={herb.id} herb={herb} onViewDetails={handleViewDetails} />)}
            </div>
            {index < array.length - 1 && (
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#7EA172] to-transparent my-8 max-w-6xl mx-auto"></div>
            )}
          </div>
        ))}
      </div>

      {/* Detailed Modal like ModelViewer */}
      {modalOpen && selectedHerb && (
        <div className="fixed inset-0 flex items-center justify-center p-6 z-50">
          {/* Semi-transparent background overlay */}
          <div className="absolute inset-0 bg-black/70 z-0" onClick={closeModal}></div>
          
          <div className="relative w-full max-w-[95vw] h-[95vh] flex flex-col z-10 overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-b from-gray-900 to-black border border-green-500/30">
            {/* Top navigation bar with glass effect */}
            <div className="flex justify-between items-center p-4 backdrop-blur-lg bg-black/60 border-b border-green-500/30">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                  {selectedHerb.name || "Unknown Herb"}
                </h2>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* View Toggle */}
                <div className="bg-gray-800/70 backdrop-blur rounded-full p-1 flex">
                  <button
                    className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                      viewType === '3d' ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => toggleViewType('3d')}
                  >
                    3D
                  </button>
                  <button
                    className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                      viewType === '2d' ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => toggleViewType('2d')}
                  >
                    2D
                  </button>
                </div>
                
                {/* Close Button */}
                <button
                  className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
                  onClick={closeModal}
                >
                  <span className="text-xl font-bold">×</span>
                </button>
              </div>
            </div>
            
            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left: 3D/2D Model container */}
              <div className="relative w-3/5 flex items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-900/20 to-green-800/10">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-300/5 rounded-full blur-3xl"></div>
                
                {/* Model showcase container with glass effect */}
                <div className="relative w-full h-full flex items-center justify-center m-6 overflow-hidden">
                  {/* Model content */}
                  <div className="relative z-20 w-full h-full flex items-center justify-center">
                    {viewType === '3d' ? (
                      <div className="flex flex-col items-center justify-center">
                        {/* This would be replaced with actual 3D model component */}
                        <div className="w-16 h-16 border-4 border-t-emerald-500 border-emerald-200/30 rounded-full animate-spin"></div>
                        <p className="text-emerald-300 mt-4">Loading 3D Model...</p>
                        <p className="text-emerald-200 mt-2">Would load: {selectedHerb.modelPath}</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full w-full p-8">
                        <div className="relative rounded-xl overflow-hidden shadow-2xl transition-all duration-300 transform hover:scale-105 group max-w-lg">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <img 
                            src={selectedHerb.image} 
                            alt={selectedHerb.name} 
                            className="max-h-full w-auto object-contain rounded-xl"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/plants/placeholder.jpg";
                            }}
                          />
                          <div className="absolute bottom-0 left-0 w-full p-4 text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="text-xl font-semibold">{selectedHerb.name}</h3>
                            <p className="text-sm text-gray-200">{selectedHerb.scientificName}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right: Information Panel */}
              <div className="w-2/5 flex flex-col bg-gradient-to-b from-green-900/30 to-emerald-800/10 backdrop-blur-sm border-l border-green-500/30">
                {/* Panel Tab Navigation */}
                <div className="flex border-b border-green-500/30">
                  <button 
                    className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-all duration-200 border-b-2 ${
                      activePanelType === 'description' 
                        ? 'border-green-400 text-green-400' 
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setActivePanel('description')}
                  >
                    <span className="text-lg">🌿</span>
                    Details
                  </button>
                  <button 
                    className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-all duration-200 border-b-2 ${
                      activePanelType === 'care' 
                        ? 'border-blue-400 text-blue-400' 
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setActivePanel('care')}
                  >
                    <span className="text-lg">💦</span>
                    Care Guide
                  </button>
                </div>
                
                {/* Panel Content */}
                <div className="flex-1 overflow-auto">
                  {/* Description Panel */}
                  {activePanelType === 'description' && (
                    <div className="p-6 text-white">
                      <div className="mb-6 bg-black/20 rounded-xl p-4 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2 mb-3">
                          <span className="text-green-400">🍃</span>
                          Plant Information
                        </h3>
                        
                        <div className="space-y-4">
                          <div className="bg-white/5 rounded-lg p-4 border border-green-500/20">
                            <h4 className="text-sm text-green-300 uppercase tracking-wider mb-1">Scientific Name</h4>
                            <p className="text-gray-200 text-lg font-medium">{selectedHerb.scientificName || "Not available"}</p>
                          </div>

                          {(selectedHerb.hindiName || selectedHerb.marathiName) && (
                            <div className="bg-white/5 rounded-lg p-4 border border-green-500/20">
                              <h4 className="text-sm text-green-300 uppercase tracking-wider mb-1">Regional Names</h4>
                              <ul className="text-gray-200 space-y-2 text-left list-disc pl-5">
                                {selectedHerb.hindiName && (
                                  <li>
                                    <span className="font-semibold text-green-200">Hindi:</span> {selectedHerb.hindiName}
                                  </li>
                                )}
                                {selectedHerb.marathiName && (
                                  <li>
                                    <span className="font-semibold text-green-200">Marathi:</span> {selectedHerb.marathiName}
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                          
                          {(selectedHerb.family || selectedHerb.origin || selectedHerb.type) && (
                            <div className="bg-white/5 rounded-lg p-4 border border-green-500/20">
                              <h4 className="text-sm text-green-300 uppercase tracking-wider mb-1">Plant Details</h4>
                              <ul className="text-gray-200 space-y-2 text-left list-disc pl-5">
                                {selectedHerb.family && (
                                  <li>
                                    <span className="font-semibold text-green-200">Family:</span> {selectedHerb.family}
                                  </li>
                                )}
                                {selectedHerb.origin && (
                                  <li>
                                    <span className="font-semibold text-green-200">Origin:</span> {selectedHerb.origin}
                                  </li>
                                )}
                                {selectedHerb.type && (
                                  <li>
                                    <span className="font-semibold text-green-200">Type:</span> {selectedHerb.type}
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}

                          {selectedHerb.foundInMaharashtra && selectedHerb.foundInMaharashtra.length > 0 && (
                            <div className="bg-white/5 rounded-lg p-4 border border-green-500/20">
                              <h4 className="text-sm text-green-300 uppercase tracking-wider mb-1">Found in Maharashtra</h4>
                              <ul className="text-gray-200 space-y-2 text-left list-disc pl-5">
                                {selectedHerb.foundInMaharashtra.map((location, index) => (
                                  <li key={index}>{location}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {selectedHerb.description && (
                            <div className="bg-white/5 rounded-lg p-4 border border-green-500/20">
                              <h4 className="text-sm text-green-300 uppercase tracking-wider mb-1">Description</h4>
                              {Array.isArray(selectedHerb.description) ? (
                                <ul className="text-gray-200 space-y-2 text-left list-disc pl-5">
                                  {selectedHerb.description.map((point, index) => (
                                    <li key={index} className="break-words">
                                      {point}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-gray-200">{selectedHerb.description}</p>
                              )}
                            </div>
                          )}

                          {selectedHerb.uses && selectedHerb.uses.length > 0 && (
                            <div className="bg-white/5 rounded-lg p-4 border border-green-500/20">
                              <h4 className="text-sm text-green-300 uppercase tracking-wider mb-1">Uses</h4>
                              <ul className="text-gray-200 space-y-2 text-left list-disc pl-5">
                                {selectedHerb.uses.map((use, index) => (
                                  <li key={index}>{use}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {selectedHerb.warnings && selectedHerb.warnings.length > 0 && (
                            <div className="bg-white/5 rounded-lg p-4 border border-green-500/20">
                              <h4 className="text-sm text-red-300 uppercase tracking-wider mb-1">Warnings</h4>
                              <ul className="text-gray-200 space-y-2 text-left list-disc pl-5">
                                {selectedHerb.warnings.map((warning, index) => (
                                  <li key={index}>{warning}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Care Guide Panel */}
                  {activePanelType === 'care' && (
                    <div className="p-6 text-white">
                      <div className="mb-6 bg-black/20 rounded-xl p-4 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2 mb-3">
                          <span className="text-blue-400">🌱</span>
                          Care Guide
                        </h3>
                        
                        <div className="space-y-4">
                          {/* Care Instructions Section */}
                          {selectedHerb.careInstructions && (
                            <div className="bg-white/5 rounded-lg p-4 border border-blue-500/20">
                              <h4 className="text-sm text-blue-300 uppercase tracking-wider mb-1">Care Instructions</h4>
                              {Array.isArray(selectedHerb.careInstructions) ? (
                                <ul className="text-gray-200 space-y-2 text-left list-disc pl-5">
                                  {selectedHerb.careInstructions.map((point, index) => (
                                    <li key={index} className="break-words">
                                      {point}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-gray-200">{selectedHerb.careInstructions}</p>
                              )}
                            </div>
                          )}
                          
                          {selectedHerb.growingConditions && (
                            <div className="bg-white/5 rounded-lg p-4 border border-blue-500/20">
                              <h4 className="text-sm text-blue-300 uppercase tracking-wider mb-1">Growing Conditions</h4>
                              <p className="text-gray-200">{selectedHerb.growingConditions}</p>
                            </div>
                          )}

                          {/* Additional Care Tips */}
                          <div className="bg-white/5 rounded-lg p-4 border border-blue-500/20">
                            <h4 className="text-sm text-blue-300 uppercase tracking-wider mb-1">Watering Schedule</h4>
                            <p className="text-gray-200">Water this plant moderately. Allow the soil to dry slightly between waterings to prevent root rot.</p>
                          </div>

                          <div className="bg-white/5 rounded-lg p-4 border border-blue-500/20">
                            <h4 className="text-sm text-blue-300 uppercase tracking-wider mb-1">Light Requirements</h4>
                            <p className="text-gray-200">Prefers bright, indirect light. Protect from harsh afternoon sun which may scorch leaves.</p>
                          </div>

                          <div className="bg-white/5 rounded-lg p-4 border border-blue-500/20">
                            <h4 className="text-sm text-blue-300 uppercase tracking-wider mb-1">Seasonal Care</h4>
                            <p className="text-gray-200">Reduce watering in winter. Apply balanced fertilizer during spring and summer growing seasons.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RareSpecies;