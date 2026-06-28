import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "react-bootstrap";
import "react-day-picker/style.css";
import { useLocation } from "react-router-dom";
import { getUserFromToken } from "../../auth/getUserFromToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CalendarReservation.css";

const CalendarReservation = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const location = useLocation();

  const horariosDisponibles = [
    "09:00",
    "10:30",
    "12:00",
    "13:30",
    "15:00",
    "16:30",
  ];

  const invalidDay = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0;
  };

  const handleSelectDay = (date) => {
    setSelectedDate(date || undefined);
    setSelectedTime("");
  };

  const handleReservation = async (e) => {
    e.preventDefault();

    const fechaFormateada = format(selectedDate, "yyyy-MM-dd");
    const fechaHoraConcat = `${fechaFormateada}T${selectedTime}`;

    if (!fechaHoraConcat) {
      toast.error("Por favor, seleccione una fecha para la reserva.");
      return;
    }

    const id_properties = location.state?.id;
    const id_agents = location.state?.id_agents;
    const token = localStorage.getItem("token");
    const id_users = getUserFromToken(token);

    if (!id_users) {
      toast.error(
        "La sesión expiró o no has iniciado sesión. Por favor, vuelve a ingresar."
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/createreservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reservation_date: fechaHoraConcat,
            id_properties,
            id_users,
            id_agents,
          }),
        }
      );

      const resultado = await response.json();

      if (response.ok) {
        toast.success("¡Reserva creada con éxito!");
        console.log("Visita confirmada:", resultado);
        setSelectedDate("");
        setSelectedTime("");
      } else {
        toast.error("Error al reservar.");
      }
    } catch (error) {
      toast.error("Se ha producido un error.");
      console.log("El error fue:", error);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-card">
        <h3>Seleccione un día para la visita</h3>

        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleSelectDay}
          locale={es}
          disabled={invalidDay}
        />
      </div>

      <div className="time-card">
        {selectedDate ? (
          <>
            <h3>Seleccione un horario</h3>

            <div className="time-grid">
              {horariosDisponibles.map((hora) => (
                <button
                  key={hora}
                  onClick={() => setSelectedTime(hora)}
                  className={`time-button ${
                    selectedTime === hora ? "active" : ""
                  }`}
                >
                  {hora} hs.
                </button>
              ))}
            </div>

            {selectedTime && (
              <Button
                className="confirm-button"
                onClick={handleReservation}
              >
                Confirmar visita
              </Button>
            )}
          </>
        ) : (
          <p className="info-text">
            Por favor, seleccione una fecha del calendario para ver los horarios
            disponibles.
          </p>
        )}
      </div>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default CalendarReservation;