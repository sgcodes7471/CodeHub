import QuestionCard from "./questionCard";

interface Props  {
    purpose:String,
    page?:number,
}

const Feed:React.FC<Props>=({purpose})=>{

    type Obj={[key:string]:any}
    let feed:Obj[] = [
        {_id:1,title:'Title 1',date:'12/12/12',views:'1234',likes:'123'},
        {_id:2,title:'Title 2',date:'12/12/12',views:'1234',likes:'123'},
        {_id:3,title:'Title 3',date:'12/12/12',views:'1234',likes:'123'},
        {_id:4,title:'Title 4',date:'12/12/12',views:'1234',likes:'123'},
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