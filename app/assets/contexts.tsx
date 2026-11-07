"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface Theme {
    theme: string,
    setTheme : Dispatch<SetStateAction<string>>
}

const ThemeContext = createContext<Theme | null>(null)

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    
    return context; 
};

export const ThemeProvider = ({ children }: {children:ReactNode}) => {
    const [theme, setTheme] = useState<string>("light");
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

///////////////////////////////////////

interface Menu {
    openMenu: boolean,
    setOpenMenu : Dispatch<SetStateAction<boolean>>
}

const MenuContext = createContext<Menu | null>(null)

export const useMenuContext = () => {
    const context = useContext(MenuContext);
    
    if (!context) {
        throw new Error("useTheme must be used within a menuProvider");
    }
    
    return context; 
};

export const MenuProvider = ({ children }: {children:ReactNode}) => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    return (
        <MenuContext.Provider value={{ openMenu, setOpenMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

// side menu

interface MenuValue {
    value: string,
    setValue : Dispatch<SetStateAction<string>>
}

const MenuValueContext = createContext<MenuValue | null>(null)

export const useMenuValueContext = () => {
    const context = useContext(MenuValueContext);
    
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    
    return context; 
};

export const MenuValueProvider = ({ children }: {children:ReactNode}) => {
    const [value, setValue] = useState<string>("today");
    return (
        <MenuValueContext.Provider value={{ value, setValue }}>
            {children}
        </MenuValueContext.Provider>
    );
};