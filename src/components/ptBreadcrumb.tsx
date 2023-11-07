import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { BreadCrumb } from "primereact/breadcrumb";
import "../app/globals.css";

export const PtBreadcrumb = ({ items }: any) => {
    const home = {
        icon: (options: any) => <HomeOutlinedIcon {...options.iconProps} />,
        url: '/'
    }

    return (<div className="relative w-full h-[3.75rem] mx-auto lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] lg:px-[3.75rem] md:px-10 px-5">
        <BreadCrumb home={home} model={items} pt={{
            root: {
                className: "text-gray-400 absolute bg-transparent top-1/2 -translate-y-1/2 p-0"
            },
            separatorIcon: {
                className: "text-gray-400 w-3 mx-1 h-5"
            },
            menuitem: {
                className: "h-4"
            }
        }} />
    </div>)
}
