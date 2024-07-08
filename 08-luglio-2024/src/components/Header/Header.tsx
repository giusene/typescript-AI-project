
interface HeaderProps {
    title: string;
    subTitle?: string;
}


const Header = (props: HeaderProps) => {
    const { title, subTitle } = props;




    return(<div>
        <h1>{title}</h1>
        {
            subTitle && <h2>{subTitle}</h2>
        }
    
        </div>
        )
}

export default Header