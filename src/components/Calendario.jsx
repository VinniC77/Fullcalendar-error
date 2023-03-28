import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

import { slug } from "../utilities/functions";

import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";

import Link from "next/link";

import styles from "../styles/Calendario.module.scss";

export default function Calendario({ eventos }) {

    const [windowWidth, setWindowWidth] = useState(0);
    const [eventoModal, setEventoModal] = useState({
        open: false,
        conteudo: {}
    });
    
    const openModal = (evento) => {
    setEventoModal(current => ({
        open: true,
        conteudo: evento
    }));
    };

    const closeModal = () => {
    setEventoModal(current => ({
        open: false,
        conteudo: {}
    }));
    };   
    
    const calendarRef = useRef();
         
    useEffect(() => {
        function windowTracker() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", windowTracker);

        windowTracker();

        return () => { 
          return window.removeEventListener('resize', windowTracker); 
        }  
    }, []);
      
    if (windowWidth === 0) return; // Para evitar que o calendário "tranque" na view errada

    function initial(windowWidth) {
      if (windowWidth < 649) {
        return 'dayGridDay'
      } else if (windowWidth < 869) {
        return 'listWeek'
      } else {
        return 'dayGridMonth'
      }
    }

    return (
      <div className={ styles["Calendario"] }>

      {/* <FullCalendar
                ref={ calendarRef }
                plugins={[ dayGridPlugin ]}
                initialView={windowWidth < 700 ? "dayGridDay" : "dayGridMonth"}
                locale="pt-br"
                headerToolbar={{
                  left: 'title',
                  right: 'prev,next'
                }}
                eventContent={ (eventInfo) => (
                  <h5 title={ eventInfo.event.title } className="fc-event-custom-el">
                    <Link href={`/evento/${eventInfo.event.id}/${slug(eventInfo.event.title)}`}>
                      {`${ eventInfo.event.title }`}
                    </Link>
                  </h5>
                )}
                events={ eventos ? eventos : [] }
                eventTimeFormat= {{
                  hour: '2-digit',
                  minute: '2-digit'
                }}
                windowResize={ (view) => {
                  var calendarApi = calendarRef.current.getApi();

                  if (windowWidth < 700 && view.type !== "dayGridDay") {
                    calendarApi.changeView('dayGridDay');
                  }

                  if (windowWidth > 700 && view.type !== "dayGridMonth") {
                    calendarApi.changeView("dayGridMonth");
                  }
                }}
                
              /> */}
         
      <FullCalendar
                ref={ calendarRef }
                plugins={[ dayGridPlugin, listPlugin ]}
                initialView={initial(windowWidth)}
                locale="pt-br"
                headerToolbar={{
                  left: 'title',
                  right: 'prev,next'
                }}
                eventContent={ (eventInfo) => (
                  <h5 title={ eventInfo.event.title } className="fc-event-custom-el">
                    <Link href={`/evento/${eventInfo.event.id}/${slug(eventInfo.event.title)}`}>
                      {`${ eventInfo.event.title }`}
                    </Link>
                  </h5>
                )}
                events={ eventos ? eventos : [] }
                noEventsText="Sem eventos neste período"
                eventTimeFormat= {{
                  hour: '2-digit',
                  minute: '2-digit'
                }}
                windowResize={ (view) => {
                  var calendarApi = calendarRef.current.getApi();

                  if (windowWidth < 649 && view.type !== "dayGridDay") {
                    calendarApi.changeView('dayGridDay');
                  }
                  else if (windowWidth < 869 && view.type !== "listWeek") {
                    calendarApi.changeView('listWeek');
                  } else {
                    calendarApi.changeView("dayGridMonth");
                  }
                }}
                
              />



              <Dialog open={ eventoModal.open } 
                onClose={ closeModal } 
                classes={{ container: styles["Modal"], paper: styles["EventoModal"] }}>

          <EventoModal evento={ eventoModal.conteudo } closeModalFunc={ closeModal }/>
        </Dialog>
        </div>
    )
}

export function EventoModal({ evento, closeModalFunc }) {

    return (
      <div className={ styles["Evento"] }>      
        <button onClick={ closeModalFunc } title="Fechar" className={ styles["fechar"] }>
          <CloseIcon style={{ fontSize: "27px" }}/>
        </button>
        {
          evento.extendedProps &&
          <div className={ styles["detalhes"] }>
  
            <h2 className={ styles["titulo"] }>{ evento.extendedProps.titulo }</h2>
            <dl>          
              {
                evento.extendedProps.descricao !== "" &&
                <div className={ styles["detalhe"] }>
                  <dt>Descrição: </dt>
                  <dl>{ evento.extendedProps.descricao }</dl>
                </div>
              }
  
              {
                evento.extendedProps.local !== "" &&
                <div className={ styles["detalhe"] }>
                  <dt>Local: </dt>
                  <dl>{ evento.extendedProps.local }</dl>
                </div>
              }
  
              {
                evento.extendedProps.link !== "" &&
                <div className={ styles["detalhe"] }>
                  <dt>Link de Inscrição: </dt>
                  <dl>
                    <a href={ evento.extendedProps.link } target="_blank" rel="noreferrer">
                      { evento.extendedProps.link }
                    </a>
                  </dl>
                </div>
              }
  
              {
                evento.extendedProps.tipo !== "" &&
                <div className={ styles["detalhe"] }>
                  <dt>Tipo: </dt>
                  <dl>{ evento.extendedProps.tipo }</dl>
                </div>
              }
  
              <div className={ styles["detalhe"] }>
                <dt>Data de Início: </dt>
                <dl>{ evento.extendedProps.inicio }</dl>
              </div>
  
              {
                evento.extendedProps.fim !== "" &&
                <div className={ styles["detalhe"] }>
                  <dt>Data de Término: </dt>
                  <dl>{ evento.extendedProps.fim }</dl>
                </div>
              }
  
              {
                evento.extendedProps.vagas !== "" &&
                <div className={ styles["detalhe"] }>
                  <dt>Vagas: </dt>
                  <dl>{ evento.extendedProps.vagas }</dl>
                </div>
              }
              
              <div className={ styles["detalhe"] }>
                <dt>Organizador(a): </dt>
                <dl>{ evento.extendedProps.organizador }</dl>
              </div>          
            </dl>
          </div>
        }
      </div>
    )
  }
