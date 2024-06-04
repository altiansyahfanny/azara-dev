import React, { ReactNode } from 'react';
import {
	Card,
	CardContent,
	// CardDescription,
	// CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';

interface ContainerProps {
	children: ReactNode;
	title: string;
}

const Container: React.FC<ContainerProps> = ({ children, title }) => {
	return (
		<Card x-chunk="dashboard-06-chunk-0">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				{/* <CardDescription>Manage your products and view their sales performance.</CardDescription> */}
			</CardHeader>
			<CardContent>{children}</CardContent>
			{/* <CardFooter>
				<div className="text-xs text-muted-foreground">
					Showing <strong>1-10</strong> of <strong>32</strong> products
				</div>
			</CardFooter> */}
		</Card>
	);
};

export default Container;
