import React from 'react'

type Props = {
    title: string,
    content: string
}

function Example({ title, content }: Props) {
    return (
        <div className="my-2 prose-slate">
            <h4 className="font-bold text-slate-700 leading-6">
                {title}
            </h4>
            <p className="font-normal text-gray-500 leading-4">
                {content}
            </p>
        </div>

    )
}

export default Example