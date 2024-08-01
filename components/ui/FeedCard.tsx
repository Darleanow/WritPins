import React from 'react';
import { Pin } from '../../mock/pin';
import Card from '../ui/Card';
import { getSolidColor } from '../utils/utils';
interface FeedCardProps {
    pin: Pin;
    onClick: () => void;
}

const FeedCard: React.FC<FeedCardProps> = ({ pin, onClick }) => (
    <Card className="my-4 mx-auto cursor-pointer" onClick={onClick}>
        <div className="px-4 py-4 bg-white rounded-xl dark:bg-gray-800">
            <h4 className="font-bold text-xs text-gray-400 dark:text-gray-500 uppercase">{pin.author.scene_name}</h4>
            <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{pin.title}</h2>
            <div className="flex flex-wrap mt-3">
                {pin.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="text-xs font-semibold py-1 px-2 rounded-full mr-2"
                        style={{
                            backgroundColor: tag.color,
                            border: `1px solid ${getSolidColor(tag.color)}`,
                            color: 'white',
                        }}
                    >
                        {tag.name}
                    </span>
                ))}
            </div>
        </div>
    </Card>
);

export default FeedCard;
