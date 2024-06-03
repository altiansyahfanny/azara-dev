import { FC, ReactNode } from 'react';
import { Button, ButtonProps } from './ui/button';
import { PlusCircle } from 'lucide-react';
import { MdUpdate } from 'react-icons/md';

type ActionButtonsProps = ButtonProps & {
	purpose: 'create' | 'update';
};

const ActionButton = (props: ActionButtonsProps) => {
	const icon = {
		create: <PlusCircle size={18} />,
		update: <MdUpdate />,
	};
	return (
		<Button {...props} className="flex items-center gap-x-2">
			{icon[props.purpose]} {props.children}
		</Button>
	);
};

interface ContainerProps {
	children: ReactNode;
	title: string;
	actionButtons?: ActionButtonsProps[];
}

const Container: FC<ContainerProps> = ({ children, title, actionButtons }) => {
	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-semibold">{title}</h1>
				{actionButtons?.length && (
					<div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
						{actionButtons.map((item, key) => {
							return <ActionButton key={key} {...item} />;
						})}
					</div>
				)}
			</div>
			<hr className="my-4" />
			{children}
		</div>
	);
};

export default Container;
