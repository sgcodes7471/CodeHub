import QuestionCard from "./questionCard";

interface Props  {
    purpose:String
}

const Feed:React.FC<Props>=({purpose})=>{

    type Obj={[key:string]:any}
    let feed:Obj[] = [
        {title:'Title 1',date:'12/12/12',views:'1234',likes:'123'},
        {title:'Title 1',date:'12/12/12',views:'1234',likes:'123'},
        {title:'Title 1',date:'12/12/12',views:'1234',likes:'123'},
        {title:'Title 1',date:'12/12/12',views:'1234',likes:'123'},
    ];

    return(
        <>
        <div className="card-heading text-3xl text-center">{purpose}</div>
        {feed.length === 0 && <div className="my-10">Nothing to Show</div>}
        {
            feed.map((data)=>{
                return(
                    <QuestionCard data={data}/>
                )
            })
        }
        </>
    )
}
export default Feed