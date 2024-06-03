import React from 'react';

interface CenterLayoutProps {
	children: React.ReactNode;
}

const CenterLayout: React.FC<CenterLayoutProps> = ({ children }) => {
	return <div className="grid place-content-center min-h-screen">{children}</div>;
};

export default CenterLayout;
