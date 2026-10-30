import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Calendar, FileText, Activity, Clock, User, Heart, Shield, Pill, ArrowRight, Star } from 'lucide-react';
import api from '../services/api';

const PatientDashboard = () => {
    const [myAppointments, setMyAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const username = localStorage.getItem('username') || 'Patient';

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000); // Poll every 10 seconds
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            const apptsRes = await api.get('appointments/');
            setMyAppointments(apptsRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getWaitingStatus = () => {
        const activeApt = myAppointments.find(a => a.queue_status === 'Waiting');
        return activeApt ? activeApt.estimated_waiting_time : null;
    };

    const waitingTime = getWaitingStatus();

    return (
        <div className="min-h-screen bg-[#fdfeff]">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="flex items-center gap-7">
                        <div className="relative group">
                            <div className="w-24 h-24 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-100 font-black text-3xl transform group-hover:rotate-12 transition-all">
                                {username.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 border-4 border-white rounded-full flex items-center justify-center">
                                <Shield className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">Premium Member</span>
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 leading-tight">Patient Dashboard</h1>
                            <p className="text-slate-400 font-medium text-lg mt-1">Status Checked, {username}. Let's track your wellness.</p>
                        </div>
                    </div>

                    {waitingTime !== null ? (
                        <div className="bg-white border border-rose-100 p-6 rounded-[2rem] flex items-center gap-5 shadow-xl shadow-rose-50/50 animate-bounce-subtle">
                            <div className="p-4 bg-rose-50 text-rose-500 rounded-2xl">
                                <Clock className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-rose-400">Current Wait Time</p>
                                <p className="text-3xl font-black text-rose-900">{waitingTime} <span className="text-sm font-medium text-rose-400">min</span></p>
                            </div>
                        </div>
                    ) : (
                        <button className="px-8 py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center gap-3 group">
                            Book New Appointment <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-all">
                                <div className="relative z-10">
                                    <div className="flex justify-between items-center mb-6">
                                        <p className="font-black text-slate-800 uppercase text-xs tracking-widest">Next Appointment</p>
                                        <div className="p-3 bg-blue-50 text-blue-500 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <p className="text-3xl font-black text-slate-900">25th March</p>
                                    <p className="text-slate-400 font-bold mt-1">General Checkup • 10:30 AM</p>
                                </div>
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform"></div>
                            </div>

                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:border-rose-200 transition-all">
                                <div className="relative z-10">
                                    <div className="flex justify-between items-center mb-6">
                                        <p className="font-black text-slate-800 uppercase text-xs tracking-widest">Health Index</p>
                                        <div className="p-3 bg-rose-50 text-rose-500 rounded-xl group-hover:bg-rose-500 group-hover:text-white transition-colors">
                                            <Heart className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <p className="text-3xl font-black text-slate-900">Optimal</p>
                                    <p className="text-emerald-500 font-black mt-1 flex items-center gap-1 text-xs">
                                        +4.2% from last month <Activity className="w-3 h-3" />
                                    </p>
                                </div>
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-rose-50 rounded-full opacity-50 group-hover:scale-150 transition-transform"></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-black text-slate-900">Recent Consultations</h2>
                                <button className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline">View Medical History</button>
                            </div>
                            <div className="space-y-6">
                                {myAppointments.map(apt => (
                                    <div key={apt.id} className="p-6 bg-[#fcfdfe] border border-slate-50 rounded-[1.5rem] flex items-center justify-between hover:border-emerald-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 transition-all group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:border-emerald-200 transition-colors">
                                                <User className="text-slate-300 w-7 h-7 group-hover:text-emerald-400 transition-colors" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 text-lg">Dr. {apt.doctor_name || 'Medical Specialist'}</p>
                                                <p className="text-sm text-slate-400 font-medium mt-0.5">{apt.date} • {apt.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${apt.queue_status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {apt.queue_status}
                                            </span>
                                            <button className="p-2 text-slate-300 hover:text-emerald-500 transition-colors">
                                                <Star className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {myAppointments.length === 0 && (
                                    <div className="text-center py-16">
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FileText className="text-slate-200 w-10 h-10" />
                                        </div>
                                        <p className="text-slate-400 font-bold">No recent medical sessions found.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black mb-1">Health Tips</h3>
                                <p className="text-slate-400 text-sm mb-8 italic">Tailored for your current recovery</p>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl h-fit">
                                            <Pill size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Medication Alert</p>
                                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">Take your Vitamin D supplement with lunch today.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl h-fit">
                                            <Activity size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">Light Exercise</p>
                                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">A 15-minute walk will help improve circulation.</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl mt-10 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                                    Explore Wellness Plan
                                </button>
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                        </div>

                        <div className="bg-[#f0f9ff] border border-blue-100 rounded-[2rem] p-8">
                            <h3 className="text-lg font-black text-slate-800 mb-6">Recent Reports</h3>
                            <div className="space-y-4">
                                {[
                                    { title: 'Blood Analysis', date: 'Mar 12, 2024', size: '2.4 MB' },
                                    { title: 'Cardio Scan', date: 'Mar 05, 2024', size: '1.8 MB' },
                                ].map((report, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <FileText className="text-blue-500 w-5 h-5" />
                                            <div>
                                                <p className="text-sm font-black text-slate-800">{report.title}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{report.date}</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="text-slate-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all w-4 h-4" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;

