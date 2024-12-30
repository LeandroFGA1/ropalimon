import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice"; 
import directory from "../../assets/imgs/directory";

const NavProfileMenu = () => {
    const { email } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const getInitials = (email) => {
        if (email) {
            const nameParts = email.split("@")[0]; 
            return nameParts.slice(0, 2).toUpperCase(); 
        }
        return ''; 
    };

    const initials = getInitials(email);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Menu>
            <MenuHandler>
                {email ? (
                    <div
                        className="cursor-pointer hover:bg-gray-200 transition-all flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white text-lg font-bold"
                        title={email}
                    >
                        {initials}
                    </div>
                ) : (
                    <Avatar
                        variant="circular"
                        alt="Perfil"
                        className="cursor-pointer hover:bg-gray-200 transition-all"
                        src={directory.userDef}
                    />
                )}
            </MenuHandler>
            <MenuList className="text-black">
                <MenuItem className="flex items-center gap-2" disabled>
                    <img alt="" />
                    <Typography variant="small" className="font-medium">
                        Mi perfil
                    </Typography>
                </MenuItem>
                <MenuItem className="flex items-center gap-2" disabled>
                    <img alt="" />
                    <Typography variant="small" className="font-medium">
                        Editar perfil
                    </Typography>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                    <img alt="" />
                    {email ? (
                        <Typography
                            variant="small"
                            className="font-bold cursor-pointer"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </Typography>
                    ) : (
                        <Link to={"/access"}>
                            <Typography variant="small" className="font-bold">
                                Iniciar sesión
                            </Typography>
                        </Link>
                    )}
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default NavProfileMenu;
