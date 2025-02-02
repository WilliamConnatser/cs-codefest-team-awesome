import React, {useState} from 'react';

export default function VolunteerForm() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [skills,setSkills] = useState([]);
    const [newSkill,setNewSkill] = useState("");

    const inputHandler = (e) => {
        switch(e.target.id) {
            case "name":
                setName(e.target.value)
                break;
            case "email":
                setEmail(e.target.value)
                break;
            case "phone":
                setPhone(e.target.value)
                break;
            case "password":
                setPassword(e.target.value)
                break;
            case "newSkill":
                setNewSkill(e.target.value)
                break;
            default:
                break;
        }
    }

    const skillsHandler  = (e) => {
        const skillsCopy = [...skills]
        skillsCopy.push(newSkill)
        setSkills(skillsCopy)
        setNewSkill("")
    }

    const createVolunteerHandler = (e) => {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_BACKEND_URI}/endpoint`, {
            method: 'post',
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              'Authorization': `Token ${'token'}`
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                password,
                skills
            })
        })
        .then( res => res.json() )
        .then((data) => {
            //If you need the response...
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
    }

    return (
        <div>
            <h1>Register Volunteer</h1>
            <form onSubmit={createVolunteerHandler}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="nameDescription" placeholder="Enter name" value={name} onChange={inputHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email" aria-describedby="emailDescription" placeholder="Enter email" value={email} onChange={inputHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control" id="phone" aria-describedby="phoneDescription" placeholder="Enter phone" value={phone} onChange={inputHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" className="form-control" id="password" aria-describedby="passwordDescription" placeholder="Enter password" value={password} onChange={inputHandler} />
                </div>
                <div className="form-group">
                    <label htmlFor="newSkill">Your Skills</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-secondary" onClick={skillsHandler} type="button">Add Skill</button>
                        </div>
                        <input type="text" className="form-control" id="newSkill" aria-describedby="skillsDescription" placeholder="Enter a skill needed" value={newSkill} onChange={inputHandler} />
                    </div>
                    <small id="skillsDescription" className="form-text text-muted">What skills can you provide?</small>
                    <div className="skills-container">
                        {skills.map((v,i) => <div key={i}>{v}</div>)}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>           
        </div>
    )
}
