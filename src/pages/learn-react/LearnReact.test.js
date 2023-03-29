import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import LearnReact from './LearnReact';

test('renders learn react link', () => {
    render(<LearnReact/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});


test('snapshot of LearnReact', () => {
    const tree = renderer
        .create(<LearnReact/>)
        .toJSON();

    expect(tree).toMatchSnapshot();
})