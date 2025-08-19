import React from 'react';
import './Timeline.css';

const Timeline = () => {
  const educationData = [
    { grade: "Grade 10", year: "2020-2021" },
    { grade: "Grade 9", year: "2019-2020" },
    { grade: "Grade 8", year: "2018-2019" },
    { grade: "Grade 7", year: "2017-2018" },
    { grade: "Grade 6", year: "2016-2017" },
    { grade: "Grade 5", year: "2015-2016" },
    { grade: "Grade 4", year: "2014-2015" },
    { grade: "Grade 3", year: "2013-2014" },
    { grade: "Grade 2", year: "2012-2013" },
    { grade: "Grade 1", year: "2011-2012" },
    { grade: "Prep", year: "2010-2011" },
    { grade: "Kinder", year: "2009-2010" },
    { grade: "Nursery", year: "2008-2009" }
  ];

  return (
    <div className="timeline-container">
      <div className="timeline-line"></div>
      {educationData.map((item, index) => (
        <div 
          key={index} 
          className="timeline-item"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          <div className="timeline-content">
            <div className="timeline-grade">{item.grade}</div>
            <div className="timeline-year">{item.year}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
