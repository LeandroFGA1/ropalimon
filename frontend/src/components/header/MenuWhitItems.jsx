import React, { useState } from 'react';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Card,
    Typography,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const MenuWhitItems = ({ title,link, menuItems = [] }) => {
    const [openMenu, setOpenMenu] = useState(false);

    const defaultItems = [
        { title: 'Item 1', description: 'Lorem ipsum dolor sit amet.' },
        { title: 'Item 2', description: 'Lorem ipsum dolor sit amet.' },
        { title: 'Item 3', description: 'Lorem ipsum dolor sit amet.' },
    ];

    const itemsToRender = menuItems.length > 0 ? menuItems : defaultItems;

    return (
        <Menu open={openMenu} handler={setOpenMenu} allowHover>
            <MenuHandler>
                <Button variant="text" className="flex items-center gap-1 text-base font-bold capitalize">
                    {title}
                    <span className={`transition-transform ${openMenu ? 'rotate-180' : ''}`}>▼</span>
                </Button>
            </MenuHandler>
            <MenuList className="grid grid-cols-7 gap-3 lg:grid">
                <Card color="gray" shadow={false} className="col-span-3 flex h-full w-full items-center justify-center rounded-2xl p-4">
                <Link to={link} className='w-full h-full'>
                    <div className=' h-full w-full flex items-center justify-center'>
                        <Typography className="text-center" variant="h5">
                            {title}
                        </Typography>
                    </div>
                    </Link>
                </Card>
                <ul className="col-span-4 flex flex-col gap-1">
                    {itemsToRender.map(({ title, description }, index) => (
                        <li key={index}>
                            <MenuItem>
                                <Typography variant="h6" color="blue-gray" className="mb-1">
                                    {title}
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    {description}
                                </Typography>
                            </MenuItem>
                        </li>
                    ))}
                </ul>
            </MenuList>
        </Menu>
    );
};

export default MenuWhitItems;
