import React from 'react'

class LoadingButton extends React.Component {
	constructor(...args) {
		super(...args);

		this.state = {
			isLoading: false
		};
	}

	render() {
		let isLoading = this.state.isLoading;
		return (
			<Button
				bsStyle="primary"
				disabled={isLoading}
				onClick={!isLoading ? this.props.onClick : null}
			>
				{isLoading ? 'Loading...' : 'Loading state'}
			</Button>
		);
	}
}
