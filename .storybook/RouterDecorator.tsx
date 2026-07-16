    import { FC, ReactNode } from 'react';
    import { BrowserRouter } from 'react-router';

    interface RouterDecoratorProps {
        children: ReactNode;
    }
    const RouterDecorator: FC<RouterDecoratorProps> = ({ children }) => {
    return <BrowserRouter>{children}</BrowserRouter>;
    };

    export default RouterDecorator;
