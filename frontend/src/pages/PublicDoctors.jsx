import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Search, MapPin, Phone } from 'lucide-react';

const PublicDoctors = () => {
    // Mock data for initial view/fallback
    const [doctors, setDoctors] = useState([
        { id: 1, name: 'Dr. Sarah Wilson', specialization: 'Cardiologist', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80', exp: '12 Years' },
        { id: 2, name: 'Dr. James Chen', specialization: 'Neurologist', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80', exp: '8 Years' },
        { id: 3, name: 'Dr. Emily Brooks', specialization: 'Pediatrician', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&q=80', exp: '15 Years' },
        { id: 4, name: 'Dr. Michael Brown', specialization: 'Orthopedic', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80', exp: '10 Years' },
    ]);

    // In a real app, we would fetch from API. 
    // useEffect(() => { api.get('doctors/').then(res => setDoctors(res.data)).catch(console.error); }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Find a Doctor</h1>
                    <p className="text-gray-600 max-w-2xl">Browse our extensive directory of qualified medical professionals. Filter by specialization or name to find the right doctor for your needs.</p>

                    <div className="mt-8 flex gap-4 max-w-3xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by doctor name or specialization..."
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            />
                        </div>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="h-64 overflow-hidden bg-gray-200">
                                <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <span className="text-blue-600 text-sm font-semibold uppercase tracking-wide">{doctor.specialization}</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-1">{doctor.name}</h3>
                                <p className="text-gray-500 text-sm mb-4">{doctor.exp} Experience</p>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <MapPin size={16} className="mr-2" />
                                        <span>Main Hospital, Block A</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <Phone size={16} className="mr-2" />
                                        <span>+1 234 567 8900</span>
                                    </div>
                                </div>

                                <button className="w-full border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PublicDoctors;
