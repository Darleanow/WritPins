import React from 'react';
import { Pin } from '../../mock/pin';
import { getSolidColor } from '../utils/utils';

interface PinCardProps {
    pin: Pin;
}

const PinCard: React.FC<PinCardProps> = ({ pin }) => {
    return (
        <div className="my-8 mx-auto max-w-3xl px-6 py-6">
            <div className="mb-4 border-b pb-4 border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{pin.title}</h2>
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">{pin.author.name} | {pin.author.scene_name}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{new Date(pin.creation_date).toLocaleDateString()}</span>
                </div>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Content</h3>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{pin.content}</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {pin.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs font-semibold py-1 px-2 rounded-full bg-opacity-75"
                            style={{
                                backgroundColor: tag.color,
                                border: `1px solid ${getSolidColor(tag.color)}`,
                                color: 'white',
                                maxWidth: '100px',
                                overflowWrap: 'break-word',
                            }}
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PinCard;
