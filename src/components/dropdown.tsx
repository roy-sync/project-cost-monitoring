// components/Dropdown.js
import { useState } from 'react';
import { usePathname, useRouter } from "next/navigation";

interface DropdownProps {
    title: string;
    items: { label: string; path: string }[];
}

const DropdownMenu: React.FC<DropdownProps> = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();
    const router = useRouter();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (path: any) => {
        router.push(path);
        setIsOpen(false); // Close the dropdown after clicking an item
    };

    return (
        <div className="relative inline-block  text-left ml-2">
            <button onClick={toggleDropdown} className="px-4 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-full text-sm">
                {title}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md">
                    <ul>
                        {items.map((item, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleItemClick(item.path)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
