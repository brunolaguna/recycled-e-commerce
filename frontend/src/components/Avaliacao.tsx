function Avaliacao(props: {
    avaliacao: number
    numVisualizacao?: number
    caption?: string
}) {
    const { avaliacao, numVisualizacao, caption } = props
    return(
        <div className="avaliacao">
            <span>
                <i className=
                {
                    avaliacao >= 1 
                        ? 'fas fa-star'
                        : avaliacao >= 0.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'

                }/>
            </span>
            <span>
                <i className=
                {
                    avaliacao >= 2 
                        ? 'fas fa-star'
                        : avaliacao >= 1.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'

                }/>
            </span>
            <span>
                <i className=
                {
                    avaliacao >= 3 
                        ? 'fas fa-star'
                        : avaliacao >= 2.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'

                }/>
            </span>
            <span>
                <i className=
                {
                    avaliacao >= 4 
                        ? 'fas fa-star'
                        : avaliacao >= 3.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'

                }/>
            </span>
            <span>
                <i className=
                {
                    avaliacao >= 5 
                        ? 'fas fa-star'
                        : avaliacao >= 4.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'

                }/>
            </span>
            {
                caption ? 
                (
                    <span>{caption}</span>
                ) : numVisualizacao != 0 ?
                (
                    <span>{' ' + numVisualizacao + ' visualizações'}</span>
                ) :
                (
                    ''
                )
            }
        </div>
    )
}

export default Avaliacao