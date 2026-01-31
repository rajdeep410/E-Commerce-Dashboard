import React, { useState } from 'react';
import { Target, PiggyBank, Plus, TrendingUp } from 'lucide-react';
import { useStore } from '../store/useStore';

const Savings = () => {
    const { savings, updateGoalProgress, addGoal } = useStore();
    const [isAddingGoal, setIsAddingGoal] = useState(false);
    const [newGoalTitle, setNewGoalTitle] = useState('');
    const [newGoalTarget, setNewGoalTarget] = useState('');

    const handleAddGoal = () => {
        if (!newGoalTitle || !newGoalTarget) return;
        const goal = {
            id: Date.now(),
            title: newGoalTitle,
            target: parseInt(newGoalTarget),
            current: 0,
            color: 'purple',
            icon: 'Target'
        };
        addGoal(goal);
        setNewGoalTitle('');
        setNewGoalTarget('');
        setIsAddingGoal(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Savings & Goals</h2>
                <button
                    onClick={() => setIsAddingGoal(true)}
                    className="px-4 py-2 bg-brand-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-brand-700 transition-colors"
                >
                    <Plus size={18} /> New Goal
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-brand-600 dark:bg-brand-700 p-6 rounded-3xl text-white flex flex-col justify-between shadow-lg shadow-brand-200 dark:shadow-none min-h-[160px]">
                    <div>
                        <p className="text-brand-100 text-sm font-medium mb-1">Total Savings</p>
                        <h3 className="text-2xl md:text-3xl font-bold">₹{savings.total.toLocaleString()}</h3>
                    </div>
                    <div className="mt-8">
                        <p className="text-[10px] md:text-xs text-brand-200 mb-2">+2.5% vs last month</p>
                        <div className="w-full bg-brand-900/20 rounded-full h-2">
                            <div className="bg-white rounded-full h-2 w-[70%]"></div>
                        </div>
                    </div>
                </div>

                {/* Goal Cards */}
                {savings.goals.map(goal => (
                    <div key={goal.id} className="bg-white dark:bg-gray-900 p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col group transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2.5 md:p-3 rounded-xl ${goal.color === 'red' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : goal.color === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400'}`}>
                                {goal.icon === 'Target' ? <Target size={20} /> : goal.icon === 'PiggyBank' ? <PiggyBank size={20} /> : <TrendingUp size={20} />}
                            </div>
                            <span className="text-[10px] font-bold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                                {Math.round((goal.current / goal.target) * 100)}%
                            </span>
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm md:text-base">{goal.title}</h4>
                        <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mb-4">Target: ₹{goal.target.toLocaleString()}</p>

                        <div className="mt-auto">
                            <div className="flex justify-between text-[10px] md:text-xs mb-2 font-medium text-gray-900 dark:text-gray-200">
                                <span>₹{goal.current.toLocaleString()}</span>
                                <span className="text-gray-400 whitespace-nowrap">₹{(goal.target - goal.current).toLocaleString()} left</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 md:h-2 mb-4">
                                <div
                                    className={`rounded-full h-full transition-all duration-1000 ${goal.color === 'red' ? 'bg-red-500' : goal.color === 'green' ? 'bg-green-500' : 'bg-brand-500'}`}
                                    style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }}
                                ></div>
                            </div>
                            <button
                                onClick={() => updateGoalProgress(goal.id, 5000)}
                                className="w-full py-2 bg-gray-50 dark:bg-gray-800 text-xs font-bold rounded-lg text-gray-600 dark:text-gray-400 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 transition-all opacity-0 group-hover:opacity-100"
                            >
                                Add ₹5,000
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Goal Modal */}
            {isAddingGoal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsAddingGoal(false)}></div>
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-md relative shadow-2xl border border-gray-100 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Create New Goal</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Goal Name</label>
                                <input
                                    type="text"
                                    value={newGoalTitle}
                                    onChange={(e) => setNewGoalTitle(e.target.value)}
                                    placeholder="e.g. Office Expansion"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none text-sm focus:ring-2 focus:ring-brand-500/20 dark:text-white outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Target Amount (₹)</label>
                                <input
                                    type="number"
                                    value={newGoalTarget}
                                    onChange={(e) => setNewGoalTarget(e.target.value)}
                                    placeholder="e.g. 100000"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-none text-sm focus:ring-2 focus:ring-brand-500/20 dark:text-white outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <button onClick={() => setIsAddingGoal(false)} className="flex-1 py-3 text-sm font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">Cancel</button>
                            <button onClick={handleAddGoal} className="flex-1 py-3 bg-brand-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/20 hover:bg-brand-700">Create Goal</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Savings;
