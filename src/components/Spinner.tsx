import React from 'react'
import SpinnerAnimation from './spinner.module.css';

type Props = {}

function Spinner({ }: Props) {
    const spinnerCount = 1;
    const getSpinnerUrl = (index: number) => {
        return require(`../assets/spinner/${index}.svg`);
    };

    return (
        <div className={SpinnerAnimation.spinner}>
            {[...Array(spinnerCount)].map((_, index) => (
                <img
                    key={index}
                    className="w-full"
                    src={getSpinnerUrl(index + 1)}
                    alt={`Spinner ${index + 1}`}
                    style={{ animationDelay: `${0.0833 * index}s` }}
                />
            ))}
        </div>
    )
}

export default Spinner