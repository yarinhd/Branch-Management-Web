import React from 'react';
import './NotesTimeline.css';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import timelineElementsMock from './timelineElements';

import 'react-vertical-timeline-component/style.min.css';
import INotesTimeline from './ITimeline';

function NotesTimeline() {
    const workIconStyles = { background: '#06D6A0' };
    const schoolIconStyles = { background: '#f9c74f' };
    const notes: INotesTimeline[] = timelineElementsMock;
    const url =
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    const url2 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8xlBwhEawy9A19aM4M15TPYs5rM5xGEHmBA&usqp=CAU';
    return (
        <div>
            <VerticalTimeline>
                {notes.map((element) => {
                    const isWorkIcon = element.icon === 'work';
                    const showButton =
                        element.buttonText !== undefined && element.buttonText !== null && element.buttonText !== '';

                    return (
                        <VerticalTimelineElement
                            key={element.id}
                            date={element.date}
                            dateClassName="date"
                            iconStyle={isWorkIcon ? workIconStyles : schoolIconStyles}
                            icon={
                                isWorkIcon ? (
                                    // <Avatar
                                    //     alt="Remy Sharp"
                                    //     src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    // />
                                    <img
                                        className="vertical-timeline-element-icon"
                                        alt="Remy Sharp"
                                        // TODO: need to put the url inside each img!!
                                        src={url}
                                    />
                                ) : (
                                    <img
                                        className="vertical-timeline-element-icon"
                                        alt="Remy Sharp"
                                        // TODO: need to put the url inside each img!!
                                        src={url2}
                                    />
                                )
                            }
                        >
                            <h3 className="vertical-timeline-element-title">{element.title}</h3>
                            <h5 className="vertical-timeline-element-subtitle">{element.location}</h5>
                            <p id="description">{element.description}</p>
                            {showButton && (
                                <a className={`button ${isWorkIcon ? 'workButton' : 'schoolButton'}`} href="/">
                                    {element.buttonText}
                                </a>
                            )}
                        </VerticalTimelineElement>
                    );
                })}
            </VerticalTimeline>
        </div>
    );
}

export default NotesTimeline;
