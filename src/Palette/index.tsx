import {shade, tint} from 'polished';
import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import {SELECTED_COLOR} from '../constants';
import {getReadableColor} from '../readable-color';

const Outer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Container = styled.div``;

export const Palette: React.FC = () => {
	const {width, height, fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const scale = interpolate(frame, [0, 50, 70], [0.8, 1.8, 10], {});
	return (
		<Outer>
			<Container
				style={{
					flex: 1,
					flexDirection: 'row',
					width: width * 0.6,
					height: height * 0.6,
					display: 'flex',
					position: 'absolute',
					transform: `scale(${scale})`,
				}}
			>
				{[
					tint(0.4, SELECTED_COLOR),
					tint(0.2, SELECTED_COLOR),
					SELECTED_COLOR,
					shade(0.2, SELECTED_COLOR),
					shade(0.4, SELECTED_COLOR),
				].map((s, i) => {
					const progress = spring({
						frame: frame - i * 4,
						fps,
						config: {
							damping: 200,
						},
					});
					return (
						<div
							key={s}
							style={{
								backgroundColor: s,
								flex: 1,
								opacity: progress,
								padding: 15,
								height: progress * 100 + '%',
								width: '110%',
								color: getReadableColor(s),
							}}
						/>
					);
				})}
			</Container>
		</Outer>
	);
};