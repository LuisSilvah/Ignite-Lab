import { Spinner } from "phosphor-react";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import {
  useCreateSubscribeMutation,
  useGetSubscribersQuery,
} from "../graphql/generated";

export function Subscribe() {
  const navigate = useNavigate();
  const [subscribe, setSubscribe] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [hasLoading, setHasLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [createSubscriber, { loading }] = useCreateSubscribeMutation();
  const { data } = useGetSubscribersQuery();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const dataMap = data?.subscribers;

    const getUser = dataMap?.find((user) => user.name === name);

    if (name === getUser?.name && email === getUser?.email) {
      setHasUser(true);
      setHasLoading(true);

      setTimeout(function () {
        navigate("/event");
      }, 1000);
    } else {
      await createSubscriber({
        variables: {
          name,
          email,
        },
      });

      navigate("/event");
    }
  }

  function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    const dataMap = data?.subscribers;

    const getUser = dataMap?.find((user) => user.name === name);

    if (getUser?.name === name && getUser?.email === email) {
      setHasLoading(true);

      setTimeout(function () {
        navigate("/event");
      }, 1000);
    } else return setHasError(true);
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto mobile:flex-col mobile:gap-7">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React JS</strong>
          </h1>

          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>

        {subscribe ? (
          <div className="p-8 bg-gray-700 border border-gray-500 rounded">
            <strong className="text-2xl mb-6 block text-center">
              Inscreva-se gratuitamente
            </strong>

            {hasUser && (
              <div className="block text-center text-gray-400 mb-7 hover:text-gray-50 transition-colors">
                <p>Usuário ja existente</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 w-full"
            >
              <input
                className="bg-gray-900 rounded px-5 h-14"
                type="text"
                placeholder="Seu nome completo"
                onChange={(event) => setName(event.target.value)}
              />

              <input
                className="bg-gray-900 rounded px-5 h-14"
                type="email"
                placeholder="Digite seu e-mail"
                onChange={(event) => setEmail(event.target.value)}
              />

              {hasLoading ? (
                <button
                  className="flex justify-center gap-2 items-center mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  <Spinner size={24} />
                  Loading
                </button>
              ) : (
                <button
                  className=" mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  Garantir minha vaga
                </button>
              )}

              <span
                onClick={() => setSubscribe(false)}
                className="block text-center text-gray-300 cursor-pointer hover:text-gray-50 transition-colors"
              >
                Já sou inscrito
              </span>
            </form>
          </div>
        ) : (
          <div className="p-8 bg-gray-700 border border-gray-500 rounded">
            <strong className="text-2xl mb-6 block text-center">
              Já sou inscrito
            </strong>

            {hasError && (
              <div className="block text-center text-gray-400 mb-7 hover:text-gray-50 transition-colors">
                <p>Login or pass invalid</p>
              </div>
            )}

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-2 w-full"
            >
              <input
                className="bg-gray-900 rounded px-5 h-14"
                type="text"
                placeholder="Digite seu login"
                onChange={(event) => setName(event.target.value)}
              />

              <input
                className="bg-gray-900 rounded px-5 h-14"
                type="email"
                placeholder="Digite seu e-mail"
                onChange={(event) => setEmail(event.target.value)}
              />

             {hasLoading ? (
                <button
                  className="flex justify-center gap-2 items-center mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  <Spinner size={24} />
                  Loading
                </button>
              ) : (
                <button
                  className=" mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  Entrar
                </button>
              )}

              <span
                onClick={() => setSubscribe(true)}
                className="block text-center text-gray-300 cursor-pointer hover:text-gray-50"
              >
                Inscreva-se gratuitamente
              </span>
            </form>
          </div>
        )}
      </div>

      <img src="/src/assets/code-bg.png" alt="" className="mt-10" />
    </div>
  );
}
